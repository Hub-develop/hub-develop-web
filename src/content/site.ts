/* ============================================================
 * Hub-develop · 站点内容总配置（唯一内容来源，双语）
 * ------------------------------------------------------------
 * 网站的每一句可见文案、每一个链接，都从这里读取。
 * 现在支持中文 / English：siteZH 与 siteEN 是两份完整配置，
 * 导出的 site 是一个会随 locale 就地切换的响应式对象，
 * 组件无需改动访问方式（仍可用 site.hero.title 等）。
 *
 *   site.brand      品牌名 / 链接 / 邮箱
 *   site.nav        顶部导航 + 页脚导航
 *   site.hero       首页大标题区（含终端窗口）
 *   site.about      关于（首页预览 + /about 详情页）
 *   site.contact    /contact 联系页
 *   site.footer     页脚（tiouo 风格大字标）
 *   site.seo        各页面 <title> / 描述
 * ============================================================ */

import { reactive, watch } from 'vue'
import { locale } from '@/i18n'
import type { Locale } from '@/i18n'
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

export interface SiteConfig {
  brand: {
    name: string
    /** 导航栏 / 页脚的小 logo 文字 */
    short: string
    tagline: string
    description: string
    /** 展示用的域名文本 */
    domain: string
    /** 组织 GitHub 地址 */
    repo: string
    /** 联系邮箱 */
    email: string
  }
  nav: NavItem[]
  socials: SocialItem[]
  hero: {
    kicker: string
    term: { user: string; host: string; cmd: string }
    title: string
    subtitle: string
    lead: string
    tags: string[]
    primaryCta: { label: string; to: string }
    secondaryCta: { label: string; to: string }
    terminal: {
      title: string
      lines: TerminalLine[]
    }
  }
  about: {
    kicker: string
    title: string
    /** 首页预览段落（可含 **强调**，由组件按需渲染） */
    lead: string
    /** /about 详情页的正文段落 */
    story: string[]
    capabilities: Capability[]
    principles: Principle[]
    /** 关于页的统计（来自 GitHub 同步快照，非手填） */
    stats: StatItem[]
  }
  contact: {
    kicker: string
    title: string
    lead: string
    channels: ContactChannel[]
    join: {
      title: string
      steps: { idx: string; title: string; desc: string }[]
    }
  }
  footer: {
    term: { user: string; host: string; cmd: string }
    /** 巨大的字标（会随屏幕缩放） */
    wordmark: string
    note: string
    /** 版权行里给组织名加下划线链接 */
    copyrightName: string
  }
  seo: {
    home: { title: string; description: string }
    projects: { title: string; description: string }
    about: { title: string; description: string }
    contact: { title: string; description: string }
    notFound: { title: string; description: string }
  }
}

/* ---------------------------------------------------------- */
/*  品牌（语言无关，仅 tagline / description 双语）              */
/* ---------------------------------------------------------- */
const repo = 'https://github.com/Hub-develop'
const email = 'xlord.heliukum@gmail.com'
const name = 'Hub-develop'

const brand = (lang: Locale) => ({
  name,
  short: 'Hub',
  tagline:
    lang === 'en'
      ? 'Open source at heart — connecting people, AI and operating systems.'
      : '以开源之名构建连接人、AI 与操作系统的门户。',
  description:
    lang === 'en'
      ? "An overview of Hub-develop's open-source projects and capabilities."
      : 'Hub-develop 的开源项目与能力总览。',
  domain: 'hub-develop.top',
  repo,
  email,
})

/* ---------------------------------------------------------- */
/*  导航                                                       */
/* ---------------------------------------------------------- */
const nav = (lang: Locale): NavItem[] => [
  { label: lang === 'en' ? 'Home' : '首页', to: '/' },
  { label: lang === 'en' ? 'Projects' : '项目', to: '/projects' },
  { label: lang === 'en' ? 'About' : '关于', to: '/about' },
  { label: lang === 'en' ? 'Contact' : '联系', to: '/contact' },
]

const socials: SocialItem[] = [
  { label: 'GitHub', href: repo, mark: 'GH' },
  { label: 'Email', href: `mailto:${email}`, mark: '@' },
]

/* ---------------------------------------------------------- */
/*  首页 Hero                                                  */
/* ---------------------------------------------------------- */
/** Hero 终端窗口（数据驱动，语言无关，中英文共用） */
const terminal: SiteConfig['hero']['terminal'] = {
  title: 'hub-develop — zsh',
  lines: [
    { type: 'cmd', text: '$ hub-develop --about' },
    { type: 'kv', key: 'stacks', value: '{{ stacks.top | take:"4, · " }}' },
    { type: 'kv', key: 'topics', value: '{{ tags.top | take:"6, " }}' },
    { type: 'kv', key: 'stars', value: '{{ totals.stars | k }}' },
    { type: 'kv', key: 'status', value: '● building', tone: 'ok' },
    { type: 'blank' },
    { type: 'cmd', text: '$ ', cursor: true },
  ],
}

const hero = (lang: Locale): SiteConfig['hero'] => ({
  kicker:
    lang === 'en'
      ? 'Building a gateway that connects people, AI, and operating systems in the name of open source.'
      : '以开源之名构建连接人、AI 与操作系统的门户。',
  term: { user: 'guest', host: 'hub-develop', cmd: 'whoami' },
  title: name,
  subtitle:
    lang === 'en'
      ? 'Building a gateway that connects people, AI, and operating systems in the name of open source.'
      : '以开源之名构建连接人、AI 与操作系统的门户。',
  lead:
    lang === 'en'
      ? 'We consolidate generic, reusable low-level engineering capabilities here, then ship them as more productized forms under CodeHub.'
      : '以开源之名构建连接人、AI 与操作系统的门户。',
  tags:
    lang === 'en'
      ? ['Cross-platform', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript']
      : ['跨平台', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript'],
  primaryCta: { label: lang === 'en' ? 'Browse projects' : '浏览核心项目', to: '/projects' },
  secondaryCta: { label: lang === 'en' ? 'About us' : '了解我们', to: '/about' },
  terminal,
})

/* ---------------------------------------------------------- */
/*  关于                                                       */
/* ---------------------------------------------------------- */
function statsFor(lang: Locale): StatItem[] {
  const t = githubData.totals
  return [
    {
      value: String(t.repos),
      label: lang === 'en' ? 'Open-source repos' : '开源仓库',
    },
    { value: '04', label: lang === 'en' ? 'Focus areas' : '专注方向' },
    {
      value: String(t.orgs),
      label: lang === 'en' ? 'Organizations' : '关联组织',
    },
  ]
}

const about = (lang: Locale): SiteConfig['about'] => ({
  kicker: '// about',
  title: lang === 'en' ? 'About Hub-develop' : '关于 Hub-develop',
  lead:
    lang === 'en'
      ? 'Building a gateway that connects people, AI, and operating systems in the name of open source.'
      : '以开源之名构建连接人、AI 与操作系统的门户。',
  story:
    lang === 'en'
      ? [
          'Hub-develop is an open-source organization.',
          'We design and build the connection between people, AI and operating systems — a portal, an integrated system.',
        ]
      : ['Hub-develop 是 一个开源组织。', '我们设计,开发,人,AI与操作系统的连接——一个门户,一个集成式体系.'],
  capabilities: [
    {
      idx: '01',
      title: lang === 'en' ? 'Cross-platform desktop' : '跨平台桌面',
      stack: '.NET · Avalonia',
      desc:
        lang === 'en'
          ? 'Native, consistent desktop apps that are genuinely pleasant to use.'
          : '以原生一致的体验，打造真正好用的桌面应用。',
    },
    {
      idx: '02',
      title: lang === 'en' ? 'Free components' : '自由组件',
      stack: 'codeNet SDK',
      desc: lang === 'en' ? 'A free, open, controllable core.' : '自由,开源,可控的核心',
    },
  ],
  principles: [
    {
      idx: '01',
      title: lang === 'en' ? 'Real over fake' : '真实优先',
      desc:
        lang === 'en'
          ? 'No placeholder data, no silent failures. Missing deps fail hard; broken features never ship.'
          : '拒绝占位数据与静默失败。依赖缺失就硬报错，功能不通就不上线。',
    }, {
      idx: '02',
      title: lang === 'en' ? 'Reusable' : '可复用',
      desc:
        lang === 'en'
          ? 'Generic capability sinks upstream — build once, reuse across projects, avoid duplication.'
          : '通用能力下沉到上游，一次沉淀、多项目复用，避免重复开发。',
    },
  ],
  stats: statsFor(lang),
})

/* ---------------------------------------------------------- */
/*  联系                                                       */
/* ---------------------------------------------------------- */
const contact = (lang: Locale): SiteConfig['contact'] => ({
  kicker: '// contact',
  title: lang === 'en' ? 'Contact' : '联系我们',
  lead:
    lang === 'en'
      ? 'Want to talk tech, report a problem, or build something together? Any of the paths below will reach us.'
      : '想交流技术、反馈问题，或者一起做点什么？下面任意一条路都能找到我们。',
  channels: [
    {
      label: lang === 'en' ? 'GitHub Org' : 'GitHub 组织',
      value: '@Hub-develop',
      href: repo,
      desc:
        lang === 'en'
          ? 'The home base for Issues, source and discussion.'
          : '提交 Issue、查看源码、参与讨论的主阵地。',
      mark: 'GH',
    },
    {
      label: lang === 'en' ? 'Email' : '电子邮箱',
      value: email,
      href: `mailto:${email}`,
      desc:
        lang === 'en'
          ? 'For collaboration, submissions or anything you would rather not post publicly.'
          : '合作、投稿或不便公开的反馈，欢迎邮件联系。',
      mark: '@',
    },
  ],
  join: {
    title: lang === 'en' ? 'How to join' : '如何参与',
    steps: [
      {
        idx: '01',
        title: lang === 'en' ? 'Browse projects' : '逛逛项目',
        desc:
          lang === 'en'
            ? 'Check the Projects page to see what we are doing and pick something you like.'
            : '在「项目」页了解我们正在做什么，挑一个你感兴趣的。',
      },
      {
        idx: '02',
        title: lang === 'en' ? 'Open an Issue' : '提个 Issue',
        desc:
          lang === 'en'
            ? 'Found a bug or have an idea? Filing an Issue on the repo is the fastest route.'
            : '发现 Bug 或有想法，直接在对应仓库提 Issue 是最快的方式。',
      },
      {
        idx: '03',
        title: lang === 'en' ? 'Start a discussion' : '发起讨论',
        desc:
          lang === 'en'
            ? 'Want to go deeper? Email us with your idea and background.'
            : '想深入聊，可以通过邮箱说明你的想法与背景。',
      },
    ],
  },
})

/* ---------------------------------------------------------- */
/*  页脚（tiouo 风格的深色大字标区）                            */
/* ---------------------------------------------------------- */
const footer = (lang: Locale): SiteConfig['footer'] => ({
  term: { user: 'user', host: 'hub-develop', cmd: 'cat footer.txt' },
  wordmark: name,
  note: lang === 'en' ? 'Building in the name of open source.' : '以开源之名构建。',
  copyrightName: name,
})

/* ---------------------------------------------------------- */
/*  SEO —— 各页面的标题与描述                                   */
/* ---------------------------------------------------------- */
const seo = (lang: Locale): SiteConfig['seo'] => ({
  home: {
    title: `${name} · ${brand(lang).tagline}`,
    description: brand(lang).description,
  },
  projects: {
    title: `${lang === 'en' ? 'Core projects' : '核心项目'} · ${name}`,
    description:
      lang === 'en'
        ? 'Open-source projects Hub-develop is building and maintaining: cross-platform software, libraries.'
        : 'Hub-develop 正在开发与维护的开源项目：跨平台软件,库。',
  },
  about: {
    title: `${lang === 'en' ? 'About' : '关于'} · ${name}`,
    description: about(lang).lead.replace(/\*\*/g, ''),
  },
  contact: {
    title: `${lang === 'en' ? 'Contact' : '联系'} · ${name}`,
    description:
      lang === 'en'
        ? 'Reach Hub-develop via GitHub or email.'
        : '通过 GitHub 与邮箱，与 Hub-develop 取得联系。',
  },
  notFound: {
    title: `${lang === 'en' ? 'Page not found' : '页面走丢了'} · ${name}`,
    description:
      lang === 'en'
        ? "The page you're looking for can't be found."
        : '找不到你要的页面。',
  },
})

/* ---------------------------------------------------------- */
/*  组装两份语言配置                                            */
/* ---------------------------------------------------------- */
const siteZH: SiteConfig = {
  brand: brand('zh'),
  nav: nav('zh'),
  socials,
  hero: hero('zh'),
  about: about('zh'),
  contact: contact('zh'),
  footer: footer('zh'),
  seo: seo('zh'),
}

const siteEN: SiteConfig = {
  brand: brand('en'),
  nav: nav('en'),
  socials,
  hero: hero('en'),
  about: about('en'),
  contact: contact('en'),
  footer: footer('en'),
  seo: seo('en'),
}

/* ---------------------------------------------------------- */
/*  导出：随 locale 就地切换的响应式对象                          */
/* ---------------------------------------------------------- */
export const site = reactive<SiteConfig>(locale.value === 'en' ? siteEN : siteZH)

watch(locale, (l) => {
  const src = l === 'en' ? siteEN : siteZH
  site.brand = src.brand
  site.nav = src.nav
  site.socials = src.socials
  site.hero = src.hero
  site.about = src.about
  site.contact = src.contact
  site.footer = src.footer
  site.seo = src.seo
})

export { projects, featuredProjects }
export type { Project, ProjectStatus, ProjectLink } from './projects'
