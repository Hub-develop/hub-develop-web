/* ============================================================
 * Hub-develop · 站点内容总配置（唯一内容来源）
 * ------------------------------------------------------------
 * 网站的每一句可见文案、每一个链接，都从这里读取。
 * 想改站上的内容？只改这个文件（以及同目录的 projects.ts）就够了。
 *
 *   site.brand      品牌名 / 链接 / 邮箱
 *   site.nav        顶部导航 + 页脚导航
 *   site.hero       首页大标题区（含终端窗口）
 *   site.about      关于（首页预览 + /about 详情页）
 *   site.contact    /contact 联系页
 *   site.footer     页脚（tiouo 风格大字标）
 *   site.seo        各页面 <title> / 描述
 * ============================================================ */

import { projects, featuredProjects } from './projects'
import { githubData } from './github'

export interface NavItem {
  label: string
  to: string
}

export interface SocialItem {
  label: string
  href: string
  /** 无图标字体时用这个短字符当图标 */
  mark: string
}

export interface Capability {
  idx: string
  title: string
  stack: string
  desc: string
}

export interface Principle {
  idx: string
  title: string
  desc: string
}

export interface StatItem {
  value: string
  label: string
}

export interface ContactChannel {
  label: string
  value: string
  href: string
  desc: string
  mark: string
}

/** 终端窗口里的一行 —— 完全可自定义，文本支持 {{ 变量 | 过滤器 }} 模板 */
export interface TerminalLine {
  /** cmd 命令行 / kv 键值 / out 输出 / text 纯文本 / blank 空行 */
  type: 'cmd' | 'kv' | 'out' | 'text' | 'blank'
  /** cmd / out / text 的文本 */
  text?: string
  /** kv 的键 */
  key?: string
  /** kv 的值 */
  value?: string
  /** 颜色：val 蓝 / num 橙 / ok 绿 / key 灰 */
  tone?: 'val' | 'num' | 'ok' | 'key'
  /** 行尾是否显示闪烁光标 */
  cursor?: boolean
}

/* ---------------------------------------------------------- */
/*  品牌                                                       */
/* ---------------------------------------------------------- */
const brand = {
  name: 'Hub-develop',
  /** 导航栏 / 页脚的小 logo 文字 */
  short: 'Hub',
  tagline: '以开源之名构建,连接人、AI 与操作系统。',
  description:
    'Hub,connect AI,PC,and User.',
  /** 展示用的域名文本 */
  domain: 'hub-develop.top',
  /** 组织 GitHub 地址 */
  repo: 'https://github.com/Hub-develop',
  /** 联系邮箱 */
  email: 'xlord.heliukum@gmail.com',
}

/* ---------------------------------------------------------- */
/*  导航                                                       */
/* ---------------------------------------------------------- */
const nav: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '项目', to: '/projects' },
  { label: '关于', to: '/about' },
  { label: '联系', to: '/contact' },
]

const socials: SocialItem[] = [
  { label: 'GitHub', href: brand.repo, mark: 'GH' },
  { label: '邮箱', href: `mailto:${brand.email}`, mark: '@' },
]

/* ---------------------------------------------------------- */
/*  首页 Hero                                                  */
/* ---------------------------------------------------------- */
const hero = {
  kicker: '以开源之名构建,连接人、AI 与操作系统。',
  term: { user: 'guest', host: 'hub-develop', cmd: 'whoami' },
  title: brand.name,
  subtitle: '以开源之名构建,连接人、AI 与操作系统。',
  lead: '我们把通用、可复用的底层工程能力沉淀在这里，再以更产品化的形态在 CodeHub 下对外发布。',
  tags: [
    '跨平台',
    '.NET / Avalonia',
    'Flutter',
    'CodeNETSDK',
    'Java',
    'JavaScript',
    'TypeScript'
  ],
  primaryCta: { label: '浏览核心项目', to: '/projects' },
  secondaryCta: { label: '了解我们', to: '/about' },
  /**
   * Hero 右侧的模拟终端窗口 —— 输出完全自定义。
   * 每一行的文本都支持模板变量，改这里就能快速换内容，无需动组件：
   *   {{ site.brand.name }} · {{ totals.repos }} ·
   *   {{ stacks.top | take:"4, · " }} · {{ tags.top | take:"6, " }} …
   * 行类型：cmd(命令行) / kv(键值) / out(输出) / text(纯文本) / blank(空行)。
   */
  terminal: {
    title: 'hub-develop — zsh',
    lines: [
      { type: 'cmd', text: '$ hub-develop --about' },
      { type: 'kv', key: 'stacks', value: '{{ stacks.top | take:"4, · " }}' },
      { type: 'kv', key: 'topics', value: '{{ tags.top | take:"6, " }}' },
      { type: 'kv', key: 'stars', value: '{{ totals.stars | k }}' },
      { type: 'kv', key: 'status', value: '● building', tone: 'ok' },
      { type: 'blank' },
      { type: 'cmd', text: '$ ', cursor: true },
    ] as TerminalLine[],
  },
}

/* ---------------------------------------------------------- */
/*  关于                                                       */
/* ---------------------------------------------------------- */
const about = {
  kicker: '// about',
  title: '关于 Hub-develop',
  /** 首页预览段落（可含 **强调**，由组件按需渲染） */
  lead: 'Hub,是人,AI与操作系统的连接——一个门户.',
  /** /about 详情页的正文段落 */
  story: [
    'Hub-develop 是 一个开源组织。',
    '我们设计,开发,人,AI与操作系统的连接——一个门户,一个集成式体系.',
  ],
  capabilities: [
    {
      idx: '01',
      title: '跨平台桌面',
      stack: '.NET · Avalonia',
      desc: '以原生一致的体验，打造真正好用的桌面应用。',
    },
    {
      idx: '02',
      title: '自由组件',
      stack: 'codeNet SDK',
      desc: '自由,开源,可控的核心',
    }
  ] as Capability[],
  principles: [
    {
      idx: '01',
      title: '真实优先',
      desc: '拒绝占位数据与静默失败。依赖缺失就硬报错，功能不通就不上线。',
    },
    {
      idx: '02',
      title: '可复用',
      desc: '通用能力下沉到上游，一次沉淀、多项目复用，避免重复开发。',
    }
  ] as Principle[],
  /** 关于页的统计（来自 GitHub 同步快照，非手填） */
  stats: [
    { value: String(githubData.totals.repos), label: '开源仓库' },
    { value: '04', label: '专注方向' },
    { value: String(githubData.totals.orgs), label: '关联组织' },
  ] as StatItem[],
}

/* ---------------------------------------------------------- */
/*  联系                                                       */
/* ---------------------------------------------------------- */
const contact = {
  kicker: '// contact',
  title: '联系我们',
  lead: '想交流技术、反馈问题，或者一起做点什么？下面任意一条路都能找到我们。',
  channels: [
    {
      label: 'GitHub 组织',
      value: '@Hub-develop',
      href: brand.repo,
      desc: '提交 Issue、查看源码、参与讨论的主阵地。',
      mark: 'GH',
    },
    {
      label: '电子邮箱',
      value: brand.email,
      href: `mailto:${brand.email}`,
      desc: '合作、投稿或不便公开的反馈，欢迎邮件联系。',
      mark: '@',
    }
  ] as ContactChannel[],
  join: {
    title: '如何参与',
    steps: [
      { idx: '01', title: '逛逛项目', desc: '在「项目」页了解我们正在做什么，挑一个你感兴趣的。' },
      { idx: '02', title: '提个 Issue', desc: '发现 Bug 或有想法，直接在对应仓库提 Issue 是最快的方式。' },
      { idx: '03', title: '发起讨论', desc: '想深入聊，可以通过邮箱说明你的想法与背景。' },
    ],
  },
}

/* ---------------------------------------------------------- */
/*  页脚（tiouo 风格的深色大字标区）                            */
/* ---------------------------------------------------------- */
const footer = {
  term: { user: 'user', host: 'hub-develop', cmd: 'cat footer.txt' },
  /** 巨大的字标（会随屏幕缩放） */
  wordmark: brand.name,
  note: '以开源之名构建。',
  /** 版权行里给组织名加下划线链接 */
  copyrightName: brand.name,
}

/* ---------------------------------------------------------- */
/*  SEO —— 各页面的标题与描述                                   */
/* ---------------------------------------------------------- */
const seo = {
  home: {
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.description,
  },
  projects: {
    title: `核心项目 · ${brand.name}`,
    description: 'Hub-develop 正在开发与维护的开源项目：跨平台软件,库。',
  },
  about: {
    title: `关于 · ${brand.name}`,
    description: about.lead.replace(/\*\*/g, ''),
  },
  contact: {
    title: `联系 · ${brand.name}`,
    description: '通过 GitHub 与邮箱，与 Hub-develop 取得联系。',
  },
  notFound: {
    title: `页面走丢了 · ${brand.name}`,
    description: '找不到你要的页面。',
  },
}

/* ---------------------------------------------------------- */
/*  导出                                                        */
/* ---------------------------------------------------------- */
export const site = {
  brand,
  nav,
  socials,
  hero,
  about,
  contact,
  footer,
  seo,
}

export { projects, featuredProjects }
export type { Project, ProjectStatus, ProjectLink } from './projects'
