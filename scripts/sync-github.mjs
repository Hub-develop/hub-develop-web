#!/usr/bin/env node
/* ============================================================
 * GitHub 数据同步脚本
 * ------------------------------------------------------------
 * 从 github.config.json 声明的组织拉取真实数据，聚合成站点快照：
 *   src/content/generated/github.json
 *
 * 产出：组织信息 / 仓库列表（含语言分布原子数据）/ 技术栈聚合 / 标签聚合 / 统计
 *
 * 运行：  npm run sync          （npm run build 前会自动执行）
 * Token： 优先 GITHUB_TOKEN / GH_TOKEN 环境变量，其次本机 `gh auth token`，
 *         都没有则匿名请求（限流 60 次/小时）。
 *
 * 设计原则：网络失败不阻断构建 —— 拉取成功才覆盖快照，失败则保留上一份。
 * ============================================================ */

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const config = JSON.parse(readFileSync(resolve(root, 'github.config.json'), 'utf8'))
const outFile = resolve(root, 'src/content/generated/github.json')

/* ---------------- token ---------------- */
function resolveToken() {
  if (process.env.GITHUB_TOKEN) return { token: process.env.GITHUB_TOKEN, from: 'GITHUB_TOKEN' }
  if (process.env.GH_TOKEN) return { token: process.env.GH_TOKEN, from: 'GH_TOKEN' }
  try {
    const t = execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    if (t) return { token: t, from: 'gh auth token' }
  } catch {
    /* 无 gh 或未登录 */
  }
  return { token: '', from: 'anonymous' }
}

const { token, from } = resolveToken()
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'hub-develop-web-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function api(path) {
  const url = path.startsWith('http') ? path : `https://api.github.com${path}`
  for (let attempt = 1; attempt <= 3; attempt++) {
    let res
    try {
      res = await fetch(url, { headers })
    } catch (e) {
      if (attempt === 3) throw e
      await new Promise((r) => setTimeout(r, attempt * 1200))
      continue
    }
    if (res.ok) return res.json()
    if (res.status === 404) return null
    if (res.status === 403 || res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, attempt * 1500))
      continue
    }
    throw new Error(`GitHub API ${res.status} on ${path}`)
  }
  throw new Error(`GitHub API 重试耗尽：${path}`)
}

/* ---------------- 拉取 ---------------- */
console.log(`▶ GitHub 数据同步（token 来源：${from}）`)

const excludeSet = new Set((config.exclude || []).map((s) => s.toLowerCase()))
const orgs = []
const repos = []

for (const src of config.orgs) {
  process.stdout.write(`  · ${src.owner} … `)
  let info
  try {
    info = await api(`/orgs/${src.owner}`)
  } catch (e) {
    console.log(`拉取失败：${e.message}`)
    continue
  }
  if (!info) {
    console.log('组织不存在，跳过')
    continue
  }

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

  let list = []
  try {
    list = (await api(`/orgs/${src.owner}/repos?per_page=100&sort=pushed&direction=desc`)) || []
  } catch (e) {
    console.log(`仓库列表拉取失败：${e.message}`)
  }

  let kept = 0
  for (const r of list) {
    if (excludeSet.has(r.name.toLowerCase())) continue
    if (config.excludeForks && r.fork) continue

    let langs = {}
    try {
      langs = (await api(`/repos/${r.full_name}/languages`)) || {}
    } catch {
      /* 语言分布失败不致命 */
    }
    const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0)
    const share = {}
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
    kept++
  }
  console.log(`${info.public_repos} 个公开仓库 → 收录 ${kept} 个`)
}

if (!repos.length) {
  console.error('✗ 未拉到任何仓库。')
  if (existsSync(outFile)) {
    console.error('  保留已有快照，不覆盖。')
    process.exit(0)
  }
  process.exit(1)
}

/* ---------------- 聚合 ---------------- */
// 技术栈：按语言累计「仓库数 + 加权占比（各仓库字节占比之和）」
const stackMap = new Map() // lang -> { name, weight, repos:Set }
for (const r of repos) {
  const langs = r.languages || {}
  const hasShare = Object.keys(langs).length > 0
  const names = hasShare ? Object.keys(langs) : r.language ? [r.language] : []
  for (const lang of names) {
    const cur = stackMap.get(lang) || { name: lang, weight: 0, repos: new Set() }
    cur.weight += hasShare ? langs[lang] : 1
    cur.repos.add(r.fullName)
    stackMap.set(lang, cur)
  }
}
const stacks = [...stackMap.values()]
  .map((s) => ({ name: s.name, repos: s.repos.size, weight: +s.weight.toFixed(4) }))
  .sort((a, b) => b.weight - a.weight || b.repos - a.repos)

// 标签：仓库 topics（首选，来自 GitHub）∪ 组织 label ∪ 主要语言（权重达标，过滤边缘语言）
const TAG_WEIGHT = { topic: 3, org: 2, language: 1 }
const tagMap = new Map()
const addTag = (t, w) => {
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

const totals = {
  repos: repos.length,
  stars: repos.reduce((a, r) => a + r.stars, 0),
  forks: repos.reduce((a, r) => a + r.forks, 0),
  openIssues: repos.reduce((a, r) => a + r.openIssues, 0),
  stacks: stacks.length,
  tags: tags.length,
  orgs: orgs.length,
  size: repos.reduce((a, r) => a + (r.size || 0), 0),
}

const snapshot = {
  syncedAt: new Date().toISOString(),
  tokenSource: from,
  orgs,
  repos,
  stacks,
  tags,
  totals,
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(snapshot, null, 2) + '\n', 'utf8')

console.log(
  `✓ 同步完成：${totals.repos} 个仓库 / ${totals.stacks} 项技术栈 / ${totals.tags} 个标签 → src/content/generated/github.json`,
)
