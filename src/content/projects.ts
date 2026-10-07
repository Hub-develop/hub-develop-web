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
 * 全部文本按当前 locale 解析；projects / featuredProjects / statusMeta
 * 均为随 locale 派生的 computed，切换语言自动跟随，组件无需改动访问方式。
 * ============================================================ */

import { computed } from 'vue'
import { locale, DEFAULT_LOCALE, type Locale } from '@/i18n'
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

/** 三种状态在 UI 上的文案与说明（按语言） */
const statusMetaAll: Record<Locale, Record<ProjectStatus, { label: string; hint: string }>> = {
  zh: {
    active: { label: '更新中', hint: '正在积极开发，持续有新提交' },
    maintained: { label: '维护中', hint: '功能趋于稳定，按需修复与迭代' },
    beta: { label: '实验', hint: '早期探索阶段，形态仍可能变化' },
  },
  en: {
    active: { label: 'Active', hint: 'Under active development with steady commits' },
    maintained: { label: 'Maintained', hint: 'Stable features, fixed and iterated as needed' },
    beta: { label: 'Experimental', hint: 'Early exploration; shape may still change' },
  },
  ja: {
    active: { label: '更新中', hint: '活発に開発中。新しいコミットが続いています' },
    maintained: { label: '保守中', hint: '機能は安定。必要に応じて修正・反復' },
    beta: { label: '実験', hint: '初期探索段階。形はまだ変わる可能性があります' },
  },
  ko: {
    active: { label: '업데이트 중', hint: '적극적으로 개발 중이며 꾸준히 커밋됩니다' },
    maintained: { label: '유지보수 중', hint: '기능이 안정적이며 필요에 따라 수정·반복' },
    beta: { label: '실험', hint: '초기 탐색 단계. 형태는 바뀔 수 있습니다' },
  },
  zht: {
    active: { label: '更新中', hint: '正在積極開發，持續有新提交' },
    maintained: { label: '維護中', hint: '功能趨於穩定，按需修復與迭代' },
    beta: { label: '實驗', hint: '早期探索階段，形態仍可能變化' },
  },
}
export const statusMeta = computed(
  () => statusMetaAll[locale.value] ?? statusMetaAll[DEFAULT_LOCALE],
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

/** 详情页「相关链接」的标签（按语言） */
const linkLabels: Record<Locale, { github: string; homepage: string; issues: string; noDesc: string }> = {
  zh: { github: 'GitHub', homepage: '主页', issues: '问题反馈', noDesc: '（暂无描述）' },
  en: { github: 'GitHub', homepage: 'Homepage', issues: 'Report issue', noDesc: '(No description yet)' },
  ja: { github: 'GitHub', homepage: 'ホームページ', issues: 'Issue を報告', noDesc: '（説明なし）' },
  ko: { github: 'GitHub', homepage: '홈페이지', issues: 'Issue 신고', noDesc: '（설명 없음）' },
  zht: { github: 'GitHub', homepage: '主頁', issues: '問題反饋', noDesc: '（暫無描述）' },
}

function buildProject(repo: GitHubRepo, lang: Locale): Project {
  const slug = repoSlug(repo.name)
  const ov = getOverride(slug)

  const labels = linkLabels[lang] ?? linkLabels[DEFAULT_LOCALE]
  const links: ProjectLink[] = [{ label: labels.github, href: repo.url, variant: 'solid' }]
  if (repo.homepage) {
    links.push({ label: labels.homepage, href: repo.homepage, variant: 'outline' })
  } else {
    links.push({ label: labels.issues, href: `${repo.url}/issues`, variant: 'outline' })
  }

  return {
    slug,
    name: pickTr(ov?.name, lang) || repo.name,
    tag: pickTr(ov?.tag, lang) || repo.orgLabel,
    status: statusFromPushedAt(repo.pushedAt, repo.archived),
    summary: pickTr(ov?.summary, lang) || repo.description || labels.noDesc,
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

/** 全部项目（顺序即 GitHub 快照里的顺序：按最近推送）。随 locale 派生的 computed。 */
export const projects = computed<Project[]>(() =>
  githubData.repos.map((r) => buildProject(r, locale.value)),
)

/** 首页精选项目（随 locale 自动跟随） */
export const featuredProjects = computed(() => projects.value.filter((p) => p.featured))

/** 按 slug 取单个项目 */
export function getProject(slug: string): Project | undefined {
  return projects.value.find((p) => p.slug === slug)
}

/** 取相邻项目（用于详情页的「上一个 / 下一个」） */
export function getProjectNeighbors(slug: string): { prev?: Project; next?: Project } {
  const i = projects.value.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  return {
    prev: i > 0 ? projects.value[i - 1] : undefined,
    next: i < projects.value.length - 1 ? projects.value[i + 1] : undefined,
  }
}
