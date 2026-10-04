/* ============================================================
 * Hub-develop · 项目数据
 * ------------------------------------------------------------
 * 站点上「项目」相关的全部内容都在这里：卡片、列表、项目详情页。
 * 新增一个项目 = 往数组里加一个对象（会自动生成卡片和 /projects/<slug> 详情页）。
 * ============================================================ */

export type ProjectStatus = 'active' | 'maintained' | 'beta'

export interface ProjectLink {
  label: string
  href: string
  /** solid = 实心主按钮，outline = 描边次按钮 */
  variant?: 'solid' | 'outline'
}

export interface Project {
  /** URL 片段：/projects/<slug> */
  slug: string
  name: string
  /** 卡片左上角的分类标签 */
  tag: string
  status: ProjectStatus
  /** 一句话简介（用于卡片） */
  summary: string
  /** 详情页正文段落，一段 = 一个 <p> */
  description: string[]
  /** 技术栈胶囊 */
  stack: string[]
  /** 详情页的能力亮点（带项目符号） */
  highlights: string[]
  /** 相关链接（项目页 / GitHub / 下载…） */
  links: ProjectLink[]
  /** 是否在首页「精选项目」里露出 */
  featured?: boolean
}

/** 三种状态在 UI 上的文案与说明 */
export const statusMeta: Record<ProjectStatus, { label: string; hint: string }> = {
  active: { label: '更新中', hint: '正在积极开发，持续有新提交' },
  maintained: { label: '维护中', hint: '功能趋于稳定，按需修复与迭代' },
  beta: { label: '实验', hint: '早期探索阶段，形态仍可能变化' },
}

export const projects: Project[] = [
  {
    slug: 'mchub',
    name: 'MChub',
    tag: '主线项目',
    status: 'active',
    summary: '基于 .NET 10 + Avalonia 的跨平台桌面启动器，统一游戏与工具的一站式入口。',
    description: [
      'MChub 是 Hub-develop 当前的主线项目，目标是做一款原生、跨平台、体验一致的桌面启动器，把启动、管理、更新这些琐事收进一个干净的界面里。',
      '技术栈上选择 .NET 10 配合 Avalonia 与 FluentAvalonia，用一套代码同时覆盖 Windows、macOS 与 Linux，并保持各平台原生的窗口行为与视觉质感。',
      '项目坚持「功能必须真实可用」的原则——不摆假的占位数据，每一个进度条、每一项监控都来自真实的系统调用。',
    ],
    stack: ['.NET 10', 'Avalonia', 'FluentAvalonia', 'C#'],
    highlights: [
      '一套代码跨 Windows / macOS / Linux 三端运行',
      '基于 FluentAvalonia 的原生级视觉与窗口行为',
      '模块化的启动与管理流程，可插拔扩展',
      '坚持真实系统调用，拒绝占位假数据',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '反馈问题', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
    featured: true,
  },
  {
    slug: 'open-panel',
    name: 'open-panel',
    tag: '多平台',
    status: 'active',
    summary: 'Flutter + Melos 单仓架构的远程控制软件，覆盖 iOS / Android / 桌面全平台。',
    description: [
      'open-panel 是一款多平台远程控制软件，基于 Flutter + Melos 的单仓（monorepo）架构组织代码，一套工程服务所有端。',
      '它实现了真实的系统监控、终端执行与局域网设备发现（UDP 广播），界面遵循 Material Design 3 并做了完整的响应式适配：宽屏走左侧导航侧边栏，窄屏切换为底部导航栏。',
      '架构上做过一次精简，把原先分散的多包结构收敛为以 general 端为核心的单一应用，降低维护成本、提升迭代速度。',
    ],
    stack: ['Flutter', 'Dart', 'Melos', 'MD3'],
    highlights: [
      'Flutter + Melos 单仓，一套工程覆盖 iOS / Android / Windows / macOS / Linux',
      '真实系统监控 + 终端执行 + UDP 局域网设备发现',
      'Material Design 3 全中文界面，响应式布局（侧边栏 / 底部导航）',
      '已实机部署验证，iOS 版本可在真机运行',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '项目页', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
    featured: true,
  },
  {
    slug: 'jvm-mcl-server',
    name: 'JVM-MCL-Server',
    tag: '服务端',
    status: 'active',
    summary: '无 UI 服务端启动器 + 网页控制面板，一键拉起 10 种核心并容器化部署。',
    description: [
      'JVM-MCL-Server 是一个「无 UI」的服务端启动器：进程起来后自动拉起一个网页控制面板，所有操作都在浏览器里完成。',
      '后端是 Spring Boot，前端是 React + MD3，两个容器通过 Docker 编排，镜像发布到 GHCR，可以直接在服务器（含 ARM 平台）上一键部署。',
      '服务端核心下载覆盖 10 种主流实现，从 Vanilla、Paper、Purpur 到 Forge / NeoForge、Fabric / Quilt、Velocity、BungeeCord 等都能按需选择。',
    ],
    stack: ['Spring Boot', 'React', 'Docker', 'GHCR'],
    highlights: [
      '无 UI 设计，启动即自动开启网页控制面板',
      '双容器架构（Spring Boot 后端 + React 前端），Docker 一键部署',
      '覆盖 10 种服务端核心，灵活切换',
      '镜像发布 GHCR，支持 ARM 平台（已在树莓派 CM4 部署）',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '镜像 / 下载', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
    featured: true,
  },
  {
    slug: 'owd-k-md3',
    name: 'OWD.K-MD3',
    tag: '文档框架',
    status: 'maintained',
    summary: '自研文档框架，MD3 风格、config 驱动，跨项目侧边栏互通、主题可定制。',
    description: [
      'OWD.K-MD3 是一套轻量的自研文档框架，基于 Material Design 3 的视觉规范与 marked.js 的 Markdown 渲染能力，用最少的依赖做出好读的文档站。',
      '整个框架由 config 驱动：导航结构、页面 slug 推断、子目录嵌套、favicon、主题定制都在一份配置里声明，站点内容与框架本身解耦。',
      '它支持跨项目的侧边栏导航互通，多套站点可以共享同一套导航体系；还内置了 hash 锚点滚动、相对 .md 链接拦截等实用细节。',
    ],
    stack: ['HTML5', 'CSS3', 'TypeScript', 'marked.js'],
    highlights: [
      'Material Design 3 视觉规范，纯前端零构建依赖',
      'config.json 驱动：导航 + slug 推断 + 子目录嵌套',
      '跨项目侧边栏互通，多站点共享导航体系',
      '主题可定制，内置 hash 锚点与相对链接处理',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '项目页', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
  },
  {
    slug: 'openos',
    name: 'OpenOS',
    tag: '操作系统',
    status: 'beta',
    summary: '基于 ChromiumOS 衍生的开源系统，移除 Google 服务、加入 Android 支持。',
    description: [
      'OpenOS 是一次「从底层出发」的探索：以 ChromiumOS 为起点，移除对 Google 服务的依赖，构建一个更开放、更可控的系统形态。',
      '在此基础上加入 Android 运行时支持，并着手制作 apt 移植版，让系统既能跑 Android 应用，也能用熟悉的包管理方式扩展。',
      '项目偏好直接从源码构建而非依赖封装脚本，以便真正掌握每一层的来龙去脉。',
    ],
    stack: ['ChromiumOS', 'Linux', 'Android', 'apt'],
    highlights: [
      '从 ChromiumOS 源码出发的定制发行版',
      '移除 Google 服务依赖，开放可控',
      '加入 Android 运行时支持',
      '探索 apt 包管理的移植方案',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '项目页', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
  },
  {
    slug: 'bugtracker',
    name: 'BugTracker',
    tag: '协作工具',
    status: 'active',
    summary: '基于 GitHub Issues 的 SPA 管理界面，OAuth 登录、站内闭环、模板规范。',
    description: [
      'BugTracker 是一个建立在 GitHub Issues 之上的单页（SPA）管理界面，目标是把「提 bug」这件事做得比 GitHub 原生页面更顺手。',
      '它采用标准的 OAuth 登录（而非个人令牌），密钥托管在 GitHub Actions Secrets 中；所有操作都在站内完成，不需要跳转回 GitHub.com。',
      '提交表单采用类 Minecraft Bug Tracker 的复现模板：复现步骤、期望行为、实际行为、环境信息，一栏不落，让每一条反馈都信息完整。',
    ],
    stack: ['TypeScript', 'OAuth', 'SPA', 'GitHub API'],
    highlights: [
      '标准 OAuth 登录，密钥走 GitHub Actions Secrets',
      '全程站内操作闭环，无需跳转 GitHub.com',
      '更精致的界面，优于 GitHub Issues 原生体验',
      'Bug 模板：复现步骤 / 期望 / 实际 / 环境信息',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Hub-develop', variant: 'solid' },
      { label: '打开面板', href: 'https://github.com/Hub-develop', variant: 'outline' },
    ],
  },
]

/** 首页精选项目 */
export const featuredProjects = projects.filter((p) => p.featured)

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
