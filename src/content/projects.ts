/* ============================================================
 * Hub-develop · 项目数据（由 GitHub 驱动，双语）
 * ------------------------------------------------------------
 * 项目不再是手写死的数据 —— 它来自真实仓库：
 *
 *   github.json.repos（数量 / 语言 / topics / star / 更新时间…）
 *        ＋
 *   overrides.ts（可选的补充多语言文案）
 *        ↓
 *   projects: Project[]  → 卡片、列表、详情页
 *
 * 也就是说：仓库里加了新语言、改了描述、多了 star，重新构建后
 * 站点会自动跟着变；想补介绍，只改 overrides.ts。
 *
 * 全部文本按当前 locale 解析；切换语言时 projects / featuredProjects
 * / statusMeta 会就地重建，组件无需改动访问方式。
 * ============================================================ */

import { computed, reactive, watch } from 'vue'
import { locale } from '@/i18n'
import type { Locale } from '@/i18n'
import { githubData, statusFromPushedAt } from './github'
import type { GitHubRepo } from './github'
import { getOverride, pickTr } from './overrides'

export type ProjectStatus = 'active' | 'maintained' | 'beta'

export interface ProjectLink {
  label: string
  href: string
  /** solid = 实心主按钮，outline = 描边次按钮 */
  variant?: 'solid' | 'outline'
}

/** 直接来自 GitHub 的元数据（详情页 / 卡片用于展示真实数据） */
export interface ProjectGithubMeta {
  url: string
  stars: number
  forks: number
  openIssues: number
  /** 主语言（GitHub 判定的那一个） */
  language: string
  /** 最近推送时间（ISO） */
  pushedAt: string
  /** 仓库体积（KB，GitHub 口径） */
  size: number
  /** SPDX 许可证标识，如 MIT / AGPL-3.0；空串表示无 */
  license: string
  homepage: string
}

export interface Project {
  /** URL 片段：/projects/<slug>（由仓库名派生） */
  slug: string
  name: string
  /** 卡片左上角的分类标签 */
  tag: string
  status: ProjectStatus
  /** 一句话简介（用于卡片） */
  summary: string
  /** 详情页正文段落，一段 = 一个 <p> */
  description: string[]
  /** 技术栈胶囊（由仓库语言分布派生） */
  stack: string[]
  /** 详情页的能力亮点（带项目符号） */
  highlights: string[]
  /** 相关链接（GitHub / 主页…） */
  links: ProjectLink[]
  /** 是否在首页「精选项目」里露出 */
  featured?: boolean
  /** GitHub 原始元数据 */
  github: ProjectGithubMeta
  /** overrides 里手动追加的标签 */
  extraTags: string[]
}

/** 三种状态在 UI 上的文案与说明 */
const statusMetaZH: Record<ProjectStatus, { label: string; hint: string }> = {
  active: { label: '更新中', hint: '正在积极开发，持续有新提交' },
  maintained: { label: '维护中', hint: '功能趋于稳定，按需修复与迭代' },
  beta: { label: '实验', hint: '早期探索阶段，形态仍可能变化' },
}
const statusMetaEN: Record<ProjectStatus, { label: string; hint: string }> = {
  active: { label: 'Active', hint: 'Under active development with steady commits' },
  maintained: { label: 'Maintained', hint: 'Stable features, fixed and iterated as needed' },
  beta: { label: 'Experimental', hint: 'Early exploration; shape may still change' },
}
export const statusMeta = computed(() =>
  locale.value === 'en' ? statusMetaEN : statusMetaZH,
)

/** 仓库名 → URL slug（MChub → mchub，MCBEforMacOS-CodeHub → mcbeforemacos-codehub） */
export function repoSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** 由语言分布取主要技术栈（占比 ≥ 3%，最多 5 项） */
function stackFromLanguages(langs: Record<string, number>, fallback: string): string[] {
  const entries = Object.entries(langs || {})
    .filter(([, w]) => w >= 0.03)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)
  if (entries.length) return entries
  return fallback ? [fallback] : []
}

function buildProject(repo: GitHubRepo, lang: Locale): Project {
  const slug = repoSlug(repo.name)
  const ov = getOverride(slug)

  const links: ProjectLink[] = [{ label: 'GitHub', href: repo.url, variant: 'solid' }]
  if (repo.homepage) {
    links.push({ label: '主页', href: repo.homepage, variant: 'outline' })
  } else {
    links.push({ label: '问题反馈', href: `${repo.url}/issues`, variant: 'outline' })
  }

  return {
    slug,
    name: pickTr(ov?.name, lang) || repo.name,
    tag: pickTr(ov?.tag, lang) || repo.orgLabel,
    status: statusFromPushedAt(repo.pushedAt, repo.archived),
    summary: pickTr(ov?.summary, lang) || repo.description || '（暂无描述）',
    description: (ov?.description?.map((d) => pickTr(d, lang)) ?? (repo.description ? [repo.description] : [])),
    stack: stackFromLanguages(repo.languages, repo.language),
    highlights: ov?.highlights?.map((h) => pickTr(h, lang)) ?? [],
    links,
    featured: ov?.featured ?? false,
    github: {
      url: repo.url,
      stars: repo.stars,
      forks: repo.forks,
      openIssues: repo.openIssues,
      language: repo.language,
      pushedAt: repo.pushedAt,
      size: repo.size,
      license: repo.license,
      homepage: repo.homepage,
    },
    extraTags: ov?.extraTags?.map((t) => pickTr(t, lang)) ?? [],
  }
}

/** 全部项目（顺序即 GitHub 快照里的顺序：按最近推送） */
export const projects = reactive<Project[]>(
  githubData.repos.map((r) => buildProject(r, locale.value)),
)

/** 语言切换时就地重建项目列表（名称 / 简介等随语言变化） */
watch(locale, (l) => {
  const next = githubData.repos.map((r) => buildProject(r, l))
  projects.splice(0, projects.length, ...next)
})

/** 首页精选项目 */
export const featuredProjects = computed(() => projects.filter((p) => p.featured))

/** 按 slug 取单个项目 */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** 取相邻项目（用于详情页的「上一个 / 下一个」） */
export function getProjectNeighbors(slug: string): { prev?: Project; next?: Project } {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  }
}
