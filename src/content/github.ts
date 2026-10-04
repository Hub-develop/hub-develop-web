/* ============================================================
 * GitHub 数据层
 * ------------------------------------------------------------
 * 站点的「仓库数量 / 技术栈 / 组织标签」全部来自 GitHub，不写死：
 *
 *   构建期：scripts/sync-github.mjs（npm run build 前自动执行）
 *           → 拉取组织 / 仓库 / 语言分布 → 聚合成快照
 *           → src/content/generated/github.json
 *
 *   运行时：本文件读取快照；并可在浏览器里重新拉一次远端数据
 *           （受 github.config.json 的 runtimeRefresh 控制），
 *           就地聚合刷新。网络 / 限流失败时静默回退到快照。
 *
 * 要改聚合范围（加组织、排除仓库…）只改仓库根的 github.config.json。
 * ============================================================ */

import { ref, shallowRef } from 'vue'
import githubJson from './generated/github.json'
import configRaw from '../../github.config.json'

/** 项目状态（与 projects.ts 的 ProjectStatus 同构） */
export type RepoStatus = 'active' | 'maintained' | 'beta'

export interface GitHubOrg {
  login: string
  name: string
  label: string
  display: string
  role: string
  note: string
  description: string
  blog: string
  location: string
  avatar: string
  url: string
  publicRepos: number
  followers: number
}

export interface GitHubRepo {
  owner: string
  orgLabel: string
  name: string
  fullName: string
  url: string
  homepage: string
  description: string
  language: string
  topics: string[]
  stars: number
  forks: number
  openIssues: number
  size: number
  archived: boolean
  license: string
  defaultBranch: string
  createdAt: string
  pushedAt: string
  /** 各语言字节占比（0–1，已四舍五入到 4 位） */
  languages: Record<string, number>
}

export interface GitHubStack {
  name: string
  repos: number
  weight: number
}

export interface GitHubTag {
  name: string
  count: number
}

export interface GitHubTotals {
  repos: number
  stars: number
  forks: number
  openIssues: number
  stacks: number
  tags: number
  orgs: number
  size: number
}

export interface GitHubData {
  syncedAt: string
  tokenSource: string
  orgs: GitHubOrg[]
  repos: GitHubRepo[]
  stacks: GitHubStack[]
  tags: GitHubTag[]
  totals: GitHubTotals
}

/** github.config.json 的形状（构建期与前端共用同一份） */
export interface GitHubConfig {
  orgs: { owner: string; label: string; display: string; role: string; note: string }[]
  exclude: string[]
  excludeForks: boolean
  runtimeRefresh: { enabled: boolean; ttlMinutes: number }
}

export const githubConfig = configRaw as GitHubConfig

/** 构建期快照（静态导入，永远可用） */
export const githubData = githubJson as unknown as GitHubData

/* ---------------------------------------------------------- */
/*  派生工具                                                   */
/* ---------------------------------------------------------- */

/** 由最近推送时间推断项目状态：半年内=更新中，一年半内=维护中，更早=实验 */
export function statusFromPushedAt(pushedAt: string, archived = false): RepoStatus {
  if (archived) return 'maintained'
  const t = new Date(pushedAt).getTime()
  if (!Number.isFinite(t)) return 'beta'
  const days = (Date.now() - t) / 86_400_000
  if (days <= 180) return 'active'
  if (days <= 540) return 'maintained'
  return 'beta'
}

/** 取技术栈名称前 n 项 */
export function topStackNames(n = 8, data: GitHubData = githubData): string[] {
  return data.stacks.slice(0, n).map((s) => s.name)
}

/** 取组织标签名称前 n 项 */
export function topTagNames(n = 12, data: GitHubData = githubData): string[] {
  return data.tags.slice(0, n).map((t) => t.name)
}

/* ---------------------------------------------------------- */
/*  运行时刷新（可选）                                         */
/* ---------------------------------------------------------- */

/** 响应式快照：默认就是构建期快照，运行时刷新成功后会被替换 */
const store = shallowRef<GitHubData>(githubData)
const refreshing = ref(false)
let lastRefreshedAt = 0

/** 取当前快照（反映运行时刷新结果） */
export function githubSnapshot(): GitHubData {
  return store.value
}

/* ---- GitHub REST（匿名，走 CORS）---- */
const API = 'https://api.github.com'

interface ApiOrg {
  login: string
  name: string | null
  description: string | null
  blog: string | null
  location: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
}
interface ApiRepo {
  name: string
  full_name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  size: number
  archived: boolean
  license: { spdx_id: string } | null
  default_branch: string
  created_at: string
  pushed_at: string
  fork: boolean
}

async function apiGet<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub API ${res.status} on ${path}`)
  return (await res.json()) as T
}

/** 与 scripts/sync-github.mjs 完全一致的聚合逻辑（浏览器端复刻） */
function aggregate(
  orgs: GitHubOrg[],
  repos: GitHubRepo[],
): { stacks: GitHubStack[]; tags: GitHubTag[]; totals: GitHubTotals } {
  // 技术栈：按语言累计「仓库数 + 加权占比」
  const stackMap = new Map<string, { name: string; weight: number; repos: Set<string> }>()
  for (const r of repos) {
    const langs = r.languages || {}
    const hasShare = Object.keys(langs).length > 0
    const names = hasShare ? Object.keys(langs) : r.language ? [r.language] : []
    for (const lang of names) {
      const cur = stackMap.get(lang) || { name: lang, weight: 0, repos: new Set<string>() }
      cur.weight += hasShare ? langs[lang] : 1
      cur.repos.add(r.fullName)
      stackMap.set(lang, cur)
    }
  }
  const stacks = [...stackMap.values()]
    .map((s) => ({ name: s.name, repos: s.repos.size, weight: +s.weight.toFixed(4) }))
    .sort((a, b) => b.weight - a.weight || b.repos - a.repos)

  // 标签：仓库 topics（权重 3）∪ 组织 label（权重 2）∪ 主要语言（权重 1，需达标）
  const TAG_WEIGHT = { topic: 3, org: 2, language: 1 }
  const tagMap = new Map<string, number>()
  const addTag = (t: string, w: number) => {
    const key = String(t).trim()
    if (!key) return
    tagMap.set(key, (tagMap.get(key) || 0) + w)
  }
  for (const r of repos) for (const t of r.topics) addTag(t, TAG_WEIGHT.topic)
  for (const o of orgs) addTag(o.label, TAG_WEIGHT.org)
  for (const s of stacks) if (s.weight >= 0.01) addTag(s.name, TAG_WEIGHT.language)
  const tags = [...tagMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 24)

  const totals: GitHubTotals = {
    repos: repos.length,
    stars: repos.reduce((a, r) => a + r.stars, 0),
    forks: repos.reduce((a, r) => a + r.forks, 0),
    openIssues: repos.reduce((a, r) => a + r.openIssues, 0),
    stacks: stacks.length,
    tags: tags.length,
    orgs: orgs.length,
    size: repos.reduce((a, r) => a + (r.size || 0), 0),
  }
  return { stacks, tags, totals }
}

/** 现场从 GitHub 拉取并聚合（匿名）。失败返回 null。 */
export async function fetchGithubData(): Promise<GitHubData | null> {
  const excludeSet = new Set((githubConfig.exclude || []).map((s) => s.toLowerCase()))
  const orgs: GitHubOrg[] = []
  const repos: GitHubRepo[] = []

  for (const src of githubConfig.orgs) {
    let info: ApiOrg | null = null
    try {
      info = await apiGet<ApiOrg>(`/orgs/${src.owner}`)
    } catch {
      continue
    }
    if (!info) continue

    orgs.push({
      login: info.login,
      name: info.name || info.login,
      label: src.label || info.login,
      display: src.display || src.label || info.login,
      role: src.role || 'projects',
      note: src.note || '',
      description: info.description || '',
      blog: info.blog || '',
      location: info.location || '',
      avatar: info.avatar_url,
      url: info.html_url,
      publicRepos: info.public_repos ?? 0,
      followers: info.followers ?? 0,
    })

    let list: ApiRepo[] = []
    try {
      list =
        (await apiGet<ApiRepo[]>(
          `/orgs/${src.owner}/repos?per_page=100&sort=pushed&direction=desc`,
        )) || []
    } catch {
      /* 列表失败不致命 */
    }

    for (const r of list) {
      if (excludeSet.has(r.name.toLowerCase())) continue
      if (githubConfig.excludeForks && r.fork) continue

      let langs: Record<string, number> = {}
      try {
        langs = (await apiGet<Record<string, number>>(`/repos/${r.full_name}/languages`)) || {}
      } catch {
        /* 语言分布失败不致命 */
      }
      const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0)
      const share: Record<string, number> = {}
      for (const [k, v] of Object.entries(langs)) {
        share[k] = totalBytes ? +(v / totalBytes).toFixed(4) : 0
      }

      repos.push({
        owner: src.owner,
        orgLabel: src.label || src.owner,
        name: r.name,
        fullName: r.full_name,
        url: r.html_url,
        homepage: r.homepage || '',
        description: r.description || '',
        language: r.language || '',
        topics: r.topics || [],
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        openIssues: r.open_issues_count ?? 0,
        size: r.size ?? 0,
        archived: !!r.archived,
        license:
          r.license?.spdx_id && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : '',
        defaultBranch: r.default_branch || 'main',
        createdAt: r.created_at,
        pushedAt: r.pushed_at,
        languages: share,
      })
    }
  }

  if (!repos.length) return null
  const { stacks, tags, totals } = aggregate(orgs, repos)
  return {
    syncedAt: new Date().toISOString(),
    tokenSource: 'anonymous (runtime)',
    orgs,
    repos,
    stacks,
    tags,
    totals,
  }
}

export interface UseGithub {
  /** 响应式快照 */
  data: typeof store
  refreshing: typeof refreshing
  /** 按 TTL 刷新（force=true 忽略 TTL）。失败静默回退到快照。 */
  refresh: (force?: boolean) => Promise<GitHubData>
  topStacks: (n?: number) => string[]
  topTags: (n?: number) => string[]
}

export function useGithub(): UseGithub {
  async function refresh(force = false): Promise<GitHubData> {
    const cfg = githubConfig.runtimeRefresh
    if (!cfg || !cfg.enabled) return store.value
    const ttl = (cfg.ttlMinutes ?? 60) * 60_000
    if (!force && lastRefreshedAt && Date.now() - lastRefreshedAt < ttl) return store.value
    if (refreshing.value) return store.value
    refreshing.value = true
    try {
      const fresh = await fetchGithubData()
      if (fresh && fresh.repos.length) {
        store.value = fresh
        lastRefreshedAt = Date.now()
      }
    } catch {
      /* 静默回退：构建快照照常渲染 */
    } finally {
      refreshing.value = false
    }
    return store.value
  }

  return {
    data: store,
    refreshing,
    refresh,
    topStacks: (n = 8) => topStackNames(n, store.value),
    topTags: (n = 12) => topTagNames(n, store.value),
  }
}
