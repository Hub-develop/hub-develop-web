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
  tagline: 'CodeHub 的上游开源组织',
  description:
    'Hub,connect AI,PC,and User.',
  /** 展示用的域名文本 */
  domain: 'hub-develop.top',
  /** 组织 GitHub 地址 */
  repo: 'https://github.com/Hub-develop',
  /** 下游 / 产品化组织（Hub-develop 的上游能力在此发布） */
  org: 'CodeHub',
  orgUrl: 'https://github.com/CodeHub-develop',
  /** 联系邮箱 */
  email: '',
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
  { label: 'CodeHub', href: brand.orgUrl, mark: 'CH' },
]

/* ---------------------------------------------------------- */
/*  首页 Hero                                                  */
/* ---------------------------------------------------------- */
const hero = {
  kicker: '为开源开发者打造跨平台、可持续迭代的工程底座',
  term: { user: 'guest', host: 'hub-develop', cmd: 'whoami' },
  title: brand.name,
  subtitle: '源自 CodeHub 的开源组织。',
  lead: '我们把通用、可复用的底层工程能力沉淀在这里，再以更产品化的形态在 CodeHub 下对外发布。',
  tags: [
    '跨平台',
    '.NET / Avalonia',
    'Flutter',
    'Spring Boot',
    'Docker',
    'TypeScript',
    'ChromiumOS',
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
      { type: 'kv', key: 'org', value: '{{ site.brand.name }}' },
      { type: 'kv', key: 'repos', value: '{{ totals.repos }} public' },
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
  lead: 'Hub-develop 与 CodeHub 协同，定位于底层能力与研究。我们把通用、可复用的工程能力沉淀在这里，再以更产品化的形态在 CodeHub 下对外发布。',
  /** /about 详情页的正文段落 */
  story: [
    'Hub-develop 与 CodeHub 协同，也是这些项目「最早被写下」的地方。',
    '我们相信好的工具应该先被自己用起来：跨平台的桌面启动器、一键部署的服务端、可复用的文档框架、以及从源码出发的操作系统探索——它们都源于真实的使用需求，而不是为了做而做。',
    '在这里，通用的、底层的、可复用的能力被沉淀成项目；打磨成熟之后，再以更产品化的形态在 CodeHub 组织下发布给更多人。',
    '我们不追求项目数量，只在乎每一件是否真的解决了问题。功能必须真实可用——这是我们最在意的一条底线。',
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
      title: '服务端与容器',
      stack: 'Spring Boot · Docker',
      desc: '无 UI 启动器 + 网页控制面板，一键拉起与部署。',
    },
    {
      idx: '03',
      title: '文档与框架',
      stack: 'MD3 · TypeScript',
      desc: '可复用、可定制的文档框架，跨项目无缝互通。',
    },
    {
      idx: '04',
      title: '操作系统',
      stack: 'ChromiumOS',
      desc: '从底层出发，探索更开放、更可控的系统形态。',
    },
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
      desc: '通用能力下沉到上游，一次沉淀、多项目复用，避免重复造轮子。',
    },
    {
      idx: '03',
      title: '开放可控',
      desc: '偏好从源码出发，掌握每一层的来龙去脉，而不是依赖封装的黑盒。',
    },
    {
      idx: '04',
      title: '长期主义',
      desc: '不做一次性项目。维护、迭代与打磨，和「做出来」同样重要。',
    },
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
    },
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
  term: { user: 'guest', host: 'hub-develop', cmd: 'cat footer.txt' },
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
    description: 'Hub-develop 正在开发与维护的开源项目：跨平台桌面、服务端、文档框架与操作系统。',
  },
  about: {
    title: `关于 · ${brand.name}`,
    description: about.lead.replace(/\*\*/g, ''),
  },
  contact: {
    title: `联系 · ${brand.name}`,
    description: '通过 GitHub 或邮箱，与 Hub-develop 取得联系。',
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
