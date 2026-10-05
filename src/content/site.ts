/* ============================================================
 * Hub-develop · 站点内容总配置（唯一内容来源，多语言）
 * ------------------------------------------------------------
 * 网站的每一句可见文案、每一个链接，都从这里读取。
 * 支持中文 / English / 日本語 / 한국어：每个文本字段用
 * tx(lang, { zh, en, ja, ko }) 按当前语言取值（缺译回退 en → zh）。
 *
 * 导出的 site 是一个【随 locale 派生的 computed】，切换语言只是换一份
 * 新的配置对象，绝不写回 / 污染源对象，因此任意方向切换都正确。
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

import { computed } from 'vue'
import { locale, DEFAULT_LOCALE, type Locale } from '@/i18n'
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
/*  多语言取值助手：缺译时回退 DEFAULT_LOCALE(en)，再回退 zh        */
/* ---------------------------------------------------------- */
type Tr4 = Partial<Record<Locale, string>>
function tx(lang: Locale, t: Tr4): string {
  return t[lang] ?? t[DEFAULT_LOCALE] ?? t.zh ?? ''
}

/* ---------------------------------------------------------- */
/*  常量（语言无关）                                            */
/* ---------------------------------------------------------- */
const repo = 'https://github.com/Hub-develop'
const email = 'xlord.heliukum@gmail.com'
const name = 'Hub-develop'

const brand = (lang: Locale) => ({
  name,
  short: 'Hub',
  tagline: tx(lang, {
    zh: '以开源之名构建连接人、AI 与操作系统的门户。',
    en: 'Open source at heart — connecting people, AI and operating systems.',
    ja: 'オープンソースの名の下に、人と AI と OS をつなぐ入り口を構築する。',
    ko: '오픈소스 정신으로 사람과 AI, 운영체제를 잇는 관문을 만듭니다.',
  }),
  description: tx(lang, {
    zh: 'Hub-develop 的开源项目与能力总览。',
    en: "An overview of Hub-develop's open-source projects and capabilities.",
    ja: 'Hub-develop のオープンソースプロジェクトと能力の総覧。',
    ko: 'Hub-develop의 오픈소스 프로젝트와 역량 총람.',
  }),
  domain: 'hub-develop.top',
  repo,
  email,
})

/* ---------------------------------------------------------- */
/*  导航                                                       */
/* ---------------------------------------------------------- */
const nav = (lang: Locale): NavItem[] => [
  { label: tx(lang, { zh: '首页', en: 'Home', ja: 'ホーム', ko: '홈' }), to: '/' },
  { label: tx(lang, { zh: '项目', en: 'Projects', ja: 'プロジェクト', ko: '프로젝트' }), to: '/projects' },
  { label: tx(lang, { zh: '关于', en: 'About', ja: 'について', ko: '소개' }), to: '/about' },
  { label: tx(lang, { zh: '联系', en: 'Contact', ja: 'お問い合わせ', ko: '문의하기' }), to: '/contact' },
]

const socials: SocialItem[] = [
  { label: 'GitHub', href: repo, mark: 'GH' },
  { label: 'Email', href: `mailto:${email}`, mark: '@' },
]

/* ---------------------------------------------------------- */
/*  首页 Hero                                                  */
/* ---------------------------------------------------------- */
/** Hero 终端窗口（数据驱动，语言无关，各语言共用） */
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
  kicker: tx(lang, {
    zh: '以开源之名构建连接人、AI 与操作系统的门户。',
    en: 'Building a gateway that connects people, AI, and operating systems in the name of open source.',
    ja: 'オープンソースの名の下に、人と AI と OS をつなぐ入り口を構築する。',
    ko: '오픈소스 정신으로 사람과 AI, 운영체제를 잇는 관문을 만듭니다.',
  }),
  term: { user: 'guest', host: 'hub-develop', cmd: 'whoami' },
  title: name,
  subtitle: tx(lang, {
    zh: '以开源之名构建连接人、AI 与操作系统的门户。',
    en: 'Building a gateway that connects people, AI, and operating systems in the name of open source.',
    ja: 'オープンソースの名の下に、人と AI と OS をつなぐ入り口を構築する。',
    ko: '오픈소스 정신으로 사람과 AI, 운영체제를 잇는 관문을 만듭니다.',
  }),
  lead: tx(lang, {
    zh: '以开源之名构建连接人、AI 与操作系统的门户。',
    en: 'We consolidate generic, reusable low-level engineering capabilities here, then ship them as more productized forms under CodeHub.',
    ja: 'ここでは汎用的で再利用可能な低層エンジニアリング能力を集約し、CodeHub のもとでより製品化された形へと届けます。',
    ko: '범용적으로 재사용 가능한 저수준 엔지니어링 역량을 여기서 모아, CodeHub 아래 더 제품화된 형태로 제공합니다.',
  }),
  tags:
    lang === 'en'
      ? ['Cross-platform', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript']
      : lang === 'ja'
        ? ['クロスプラットフォーム', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript']
        : lang === 'ko'
          ? ['크로스 플랫폼', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript']
          : ['跨平台', '.NET / Avalonia', 'Flutter', 'CodeNETSDK', 'Java', 'JavaScript', 'TypeScript'],
  primaryCta: {
    label: tx(lang, { zh: '浏览核心项目', en: 'Browse projects', ja: 'コアプロジェクトを見る', ko: '핵심 프로젝트 보기' }),
    to: '/projects',
  },
  secondaryCta: {
    label: tx(lang, { zh: '了解我们', en: 'About us', ja: '私たちについて', ko: '우리 소개' }),
    to: '/about',
  },
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
      label: tx(lang, { zh: '开源仓库', en: 'Open-source repos', ja: 'オープンソースリポジトリ', ko: '오픈소스 저장소' }),
    },
    { value: '04', label: tx(lang, { zh: '专注方向', en: 'Focus areas', ja: '注力分野', ko: '중점 분야' }) },
    {
      value: String(t.orgs),
      label: tx(lang, { zh: '关联组织', en: 'Organizations', ja: '組織', ko: '조직' }),
    },
  ]
}

const about = (lang: Locale): SiteConfig['about'] => ({
  kicker: '// about',
  title: tx(lang, { zh: '关于 Hub-develop', en: 'About Hub-develop', ja: 'Hub-develop について', ko: 'Hub-develop 소개' }),
  lead: tx(lang, {
    zh: '以开源之名构建连接人、AI 与操作系统的门户。',
    en: 'Building a gateway that connects people, AI, and operating systems in the name of open source.',
    ja: 'オープンソースの名の下に、人と AI と OS をつなぐ入り口を構築する。',
    ko: '오픈소스 정신으로 사람과 AI, 운영체제를 잇는 관문을 만듭니다.',
  }),
  story: [
    tx(lang, {
      zh: 'Hub-develop 是 一个开源组织。',
      en: 'Hub-develop is an open-source organization.',
      ja: 'Hub-develop はオープンソースの組織です。',
      ko: 'Hub-develop는 오픈소스 조직입니다.',
    }),
    tx(lang, {
      zh: '我们设计,开发,人,AI与操作系统的连接——一个门户,一个集成式体系.',
      en: 'We design and build the connection between people, AI and operating systems — a portal, an integrated system.',
      ja: '私たちは人と AI と OS のつながりを設計・構築します——一つの入り口、一つの統合された体系。',
      ko: '우리는 사람과 AI, 운영체제 사이의 연결을 설계하고 구축합니다——하나의 관문, 통합된 체계.',
    }),
  ],
  capabilities: [
    {
      idx: '01',
      title: tx(lang, { zh: '跨平台桌面', en: 'Cross-platform desktop', ja: 'クロスプラットフォームデスクトップ', ko: '크로스 플랫폼 데스크톱' }),
      stack: '.NET · Avalonia',
      desc: tx(lang, {
        zh: '以原生一致的体验，打造真正好用的桌面应用。',
        en: 'Native, consistent desktop apps that are genuinely pleasant to use.',
        ja: 'ネイティブで一貫した体験で、本当に使いやすいデスクトップアプリを作る。',
        ko: '네이티브하고 일관된 경험으로, 정말 쓰기 좋은 데스크톱 앱을 만듭니다.',
      }),
    },
    {
      idx: '02',
      title: tx(lang, { zh: '自由组件', en: 'Free components', ja: '自由コンポーネント', ko: '자유 컴포넌트' }),
      stack: 'codeNet SDK',
      desc: tx(lang, {
        zh: '自由,开源,可控的核心',
        en: 'A free, open, controllable core.',
        ja: '自由で、オープンで、制御可能なコア。',
        ko: '자유롭고, 오픈되며, 통제 가능한 코어.',
      }),
    },
  ],
  principles: [
    {
      idx: '01',
      title: tx(lang, { zh: '真实优先', en: 'Real over fake', ja: '本物優先', ko: '실제 우선' }),
      desc: tx(lang, {
        zh: '拒绝占位数据与静默失败。依赖缺失就硬报错，功能不通就不上线。',
        en: 'No placeholder data, no silent failures. Missing deps fail hard; broken features never ship.',
        ja: 'プレースホルダーも、暗黙の失敗も拒否。依存欠落は明示的にエラーとし、動かない機能は出しません。',
        ko: '플레이스홀더 데이터도, 조용한 실패도 거부. 누락된 의존성은 명시적으로 실패하며, 동작하지 않는 기능은 출시하지 않습니다.',
      }),
    },
    {
      idx: '02',
      title: tx(lang, { zh: '可复用', en: 'Reusable', ja: '再利用可能', ko: '재사용 가능' }),
      desc: tx(lang, {
        zh: '通用能力下沉到上游，一次沉淀、多项目复用，避免重复开发。',
        en: 'Generic capability sinks upstream — build once, reuse across projects, avoid duplication.',
        ja: '汎用能力は上流へ下沉——一度作れば複数プロジェクトで再利用し、重複を避ける。',
        ko: '범용 역량은 상류로 내려가 — 한 번 만들고 여러 프로젝트에서 재사용하며 중복을 피합니다.',
      }),
    },
  ],
  stats: statsFor(lang),
})

/* ---------------------------------------------------------- */
/*  联系                                                       */
/* ---------------------------------------------------------- */
const contact = (lang: Locale): SiteConfig['contact'] => ({
  kicker: '// contact',
  title: tx(lang, { zh: '联系我们', en: 'Contact', ja: 'お問い合わせ', ko: '문의하기' }),
  lead: tx(lang, {
    zh: '想交流技术、反馈问题，或者一起做点什么？下面任意一条路都能找到我们。',
    en: 'Want to talk tech, report a problem, or build something together? Any of the paths below will reach us.',
    ja: '技術談義、問題報告、あるいは一緒に何か作る？以下のどの道でも私たちに届きます。',
    ko: '기술 얘기, 문제 제보, 또는 함께 무언가 만들기? 아래 어느 경로로든 우리에게 닿을 수 있습니다.',
  }),
  channels: [
    {
      label: tx(lang, { zh: 'GitHub 组织', en: 'GitHub Org', ja: 'GitHub 組織', ko: 'GitHub 조직' }),
      value: '@Hub-develop',
      href: repo,
      desc: tx(lang, {
        zh: '提交 Issue、查看源码、参与讨论的主阵地。',
        en: 'The home base for Issues, source and discussion.',
        ja: 'Issue・ソース・議論の拠点。',
        ko: 'Issue·소스·토론의 거점.',
      }),
      mark: 'GH',
    },
    {
      label: tx(lang, { zh: '电子邮箱', en: 'Email', ja: 'メール', ko: '이메일' }),
      value: email,
      href: `mailto:${email}`,
      desc: tx(lang, {
        zh: '合作、投稿或不便公开的反馈，欢迎邮件联系。',
        en: 'For collaboration, submissions or anything you would rather not post publicly.',
        ja: '協業・寄稿・公開したくない feedback はメールで。',
        ko: '협업·기고·공개하고 싶지 않은 피드백은 메일로.',
      }),
      mark: '@',
    },
  ],
  join: {
    title: tx(lang, { zh: '如何参与', en: 'How to join', ja: '参加するには', ko: '참여 방법' }),
    steps: [
      {
        idx: '01',
        title: tx(lang, { zh: '逛逛项目', en: 'Browse projects', ja: 'プロジェクトを見る', ko: '프로젝트 둘러보기' }),
        desc: tx(lang, {
          zh: '在「项目」页了解我们正在做什么，挑一个你感兴趣的。',
          en: 'Check the Projects page to see what we are doing and pick something you like.',
          ja: '「プロジェクト」ページで現在の活動を確認し、興味のあるものを選んでください。',
          ko: '"프로젝트" 페이지에서 우리가 하는 일을 보고 관심 있는 것을 고르세요.',
        }),
      },
      {
        idx: '02',
        title: tx(lang, { zh: '提个 Issue', en: 'Open an Issue', ja: 'Issue を立てる', ko: 'Issue 남기기' }),
        desc: tx(lang, {
          zh: '发现 Bug 或有想法，直接在对应仓库提 Issue 是最快的方式。',
          en: 'Found a bug or have an idea? Filing an Issue on the repo is the fastest route.',
          ja: 'バグ発見やアイデアは、該当リポジトリに Issue を立てるのが一番早い方法です。',
          ko: '버그를 발견하거나 아이디어가 있다면, 해당 저장소에 Issue를 남기는 것이 가장 빠릅니다.',
        }),
      },
      {
        idx: '03',
        title: tx(lang, { zh: '发起讨论', en: 'Start a discussion', ja: '議論を始める', ko: '토론 시작하기' }),
        desc: tx(lang, {
          zh: '想深入聊，可以通过邮箱说明你的想法与背景。',
          en: 'Want to go deeper? Email us with your idea and background.',
          ja: 'もっと深く話したいなら、アイデアと背景をメールで。',
          ko: '더 깊이 이야기하고 싶다면, 아이디어와 배경을 메일로 보내세요.',
        }),
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
  note: tx(lang, {
    zh: '以开源之名构建。',
    en: 'Building in the name of open source.',
    ja: 'オープンソースの名の下に構築する。',
    ko: '오픈소스 정신으로 만듭니다.',
  }),
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
    title: `${tx(lang, { zh: '核心项目', en: 'Core projects', ja: 'コアプロジェクト', ko: '핵심 프로젝트' })} · ${name}`,
    description: tx(lang, {
      zh: 'Hub-develop 正在开发与维护的开源项目：跨平台软件,库。',
      en: 'Open-source projects Hub-develop is building and maintaining: cross-platform software, libraries.',
      ja: 'Hub-develop が開発・保守するオープンソースプロジェクト：クロスプラットフォームソフトウェア、ライブラリ。',
      ko: 'Hub-develop가 개발·유지하는 오픈소스 프로젝트: 크로스 플랫폼 소프트웨어, 라이브러리.',
    }),
  },
  about: {
    title: `${tx(lang, { zh: '关于', en: 'About', ja: 'について', ko: '소개' })} · ${name}`,
    description: about(lang).lead.replace(/\*\*/g, ''),
  },
  contact: {
    title: `${tx(lang, { zh: '联系', en: 'Contact', ja: 'お問い合わせ', ko: '문의하기' })} · ${name}`,
    description: tx(lang, {
      zh: '通过 GitHub 与邮箱，与 Hub-develop 取得联系。',
      en: 'Reach Hub-develop via GitHub or email.',
      ja: 'GitHub またはメールで Hub-develop に連絡を。',
      ko: 'GitHub나 이메일로 Hub-develop에 연락하세요.',
    }),
  },
  notFound: {
    title: `${tx(lang, { zh: '页面走丢了', en: 'Page not found', ja: 'ページが見つかりません', ko: '페이지를 찾을 수 없음' })} · ${name}`,
    description: tx(lang, {
      zh: '找不到你要的页面。',
      en: "The page you're looking for can't be found.",
      ja: 'お探しのページが見つかりません。',
      ko: '찾으시는 페이지를 찾을 수 없습니다.',
    }),
  },
})

/* ---------------------------------------------------------- */
/*  导出：由 locale 派生的只读响应式配置                          */
/* ---------------------------------------------------------- */
/*  每次 locale 变化都重新构建一整份 SiteConfig（tx 按当前语言取值），
 *  切换语言只是换一份新的配置对象，绝不会写回 / 污染源对象，
 *  因此 ZH / EN / JA / KO 任意方向切换都正确。 */
export const site = computed<SiteConfig>(() => ({
  brand: brand(locale.value),
  nav: nav(locale.value),
  socials,
  hero: hero(locale.value),
  about: about(locale.value),
  contact: contact(locale.value),
  footer: footer(locale.value),
  seo: seo(locale.value),
}))

export { projects, featuredProjects }
export type { Project, ProjectStatus, ProjectLink } from './projects'
