/* ============================================================
 * 项目文案覆盖（可选）
 * ------------------------------------------------------------
 * 站点项目卡 / 详情页的数据以 GitHub 为准（仓库数量、语言、topics、star…）。
 * 这里只用来「补充/覆盖」GitHub 上缺失的中文介绍。
 *
 *   不写某个仓库也没关系 —— 会自动用 GitHub 的 description 兜底。
 *   写了 slug 对应的对象，就按这里的内容展示。
 *
 * 修改方式：以仓库名的小写 slug 为 key（如 MChub → 'mchub'）。
 * ============================================================ */

export interface ProjectOverride {
  /** 卡片 / 详情页展示名（默认用仓库名） */
  name?: string
  /** 卡片左上角分类标签（默认用组织 label） */
  tag?: string
  /** 是否上首页「精选项目」 */
  featured?: boolean
  /** 卡片一句话简介（默认用 GitHub description） */
  summary?: string
  /** 详情页正文段落 */
  description?: string[]
  /** 详情页能力亮点 */
  highlights?: string[]
  /** 追加到 GitHub topics 之外的标签 */
  extraTags?: string[]
}

export const projectOverrides: Record<string, ProjectOverride> = {
  mchub: {
    name: 'MChub',
    tag: '主线项目',
    featured: true,
    summary: '基于 .NET + Avalonia 的跨平台启动器组件，统一游戏与工具的一站式入口。',
    description: [
      'MChub 是 Hub.code 当前的主线项目，目标是做一款原生、跨平台、体验一致的启动器，把启动、管理、更新这些琐事收进一个干净的界面里。',
      '技术栈以 .NET 为核心，配合 Avalonia 与 FluentAvalonia 构建界面，用一套代码同时覆盖 Windows、macOS 与 Linux，并保持各平台原生的窗口行为与视觉质感。',
      '项目坚持「功能必须真实可用」——不摆假的占位数据，每一个进度条、每一项状态都来自真实的系统调用。',
    ],
    highlights: [
      '一套代码跨 Windows / macOS / Linux 三端运行',
      '基于 FluentAvalonia 的原生级视觉与窗口行为',
      '模块化的启动与管理流程，可插拔扩展',
      '坚持真实系统调用，拒绝占位假数据',
    ],
  },

  codenet: {
    name: 'CodeNet',
    tag: '运行时 / SDK',
    featured: true,
    summary: '为 macOS 定制的 .NET 运行时分支，用 signal-based SEH 绕过 EXC_GUARD 崩溃。',
    description: [
      'CodeNet 是一个面向 macOS 的 .NET 运行时分支（fork），解决上游运行时在新版 macOS 上的启动崩溃问题。',
      '在 macOS 27 上，原生 .NET 的 Mach exception 处理路径会触发 EXC_GUARD，被系统以 SIGKILL 终止，表现为「Failed to create CoreCLR」。CodeNet 改用基于信号的 SEH（signal-based structured exception handling）绕开这条路径。',
      '产物以 SDK 形式分发，配套 osx-arm64 / osx-x64 以及 Linux 版本，可直接替换官方 SDK 使用。',
    ],
    highlights: [
      '用 signal-based SEH 替代 Mach exception 路径，规避 EXC_GUARD',
      '覆盖 osx-arm64、osx-x64 与 Linux 的完整 SDK 分发',
      '可直接替换 .NET SDK，构建与运行行为保持一致',
    ],
  },

  'mcbeforemacos-codehub': {
    name: 'MCBEforMacOS',
    tag: '跨平台运行',
    featured: true,
    summary: '在 macOS 上运行《我的世界》基岩版（Windows GDK 版）的自包含运行时。',
    description: [
      'MCBEforMacOS 是一套自包含运行时，目标是在 macOS 上直接跑起《我的世界》基岩版的 Windows GDK 版本。',
      '方案把 Wine（WineGDK）、xodus-service 以及 MoltenVK / DXVK / vkd3d-proton 等图形转换层打包在一起，尽量做到开箱即用，不依赖用户自己折腾环境。',
      '项目以 Shell 脚本组织构建与启动流程，把复杂的兼容层依赖收敛成一次可复现的安装。',
    ],
    highlights: [
      '自包含运行时：Wine(WineGDK) + xodus-service + 图形转换层',
      'MoltenVK / DXVK / vkd3d-proton 图形栈整合',
      '面向 macOS 的构建与启动流程，开箱即用',
    ],
  },

  'codehub-oreui': {
    name: 'CodeHub-OreUI',
    tag: 'UI 组件库',
    summary: '为 Avalonia 12 打造的 Minecraft 基岩版 OreUI 风格控件库。',
    description: [
      'CodeHub-OreUI 是一套 Avalonia 控件库，把《我的世界》基岩版 OreUI 的视觉语言带进 .NET 桌面应用。',
      '它面向 Avalonia 12，提供贴近游戏内风格的按钮、面板等控件，方便为自己的工具做一套统一、带点游戏味的界面。',
    ],
    highlights: [
      '复刻 Minecraft 基岩版 OreUI 的视觉风格',
      '面向 Avalonia 12 的控件实现',
    ],
  },

  'codehub-fluentui': {
    name: 'CodeHub-FluentUI',
    tag: 'UI 组件库',
    summary: '面向 Fluent Design 的 Avalonia 控件库，把更多 WinUI 控件带进 Avalonia。',
    description: [
      'CodeHub-FluentUI 是一个专注于 Fluent Design 的控件库，目标是把更多 WinUI 风格的控件带到 Avalonia 生态里。',
      '它让跨平台 .NET 应用也能获得贴近 Windows 11 的视觉与交互，减少为每个平台单独适配的成本。',
    ],
    highlights: [
      '聚焦 Fluent Design 的控件实现',
      '将更多 WinUI 控件引入 Avalonia',
    ],
  },

  webhub: {
    name: 'WebHub',
    tag: 'Web / 安全',
    summary: '围绕网站与网络安全的实验与工具集合。',
    description: [
      'WebHub 是围绕网站建设与网络安全方向的实验与工具集合。',
      '目前处于早期阶段，后续会沉淀成可复用的能力。',
    ],
    highlights: [],
  },
}

/** 按仓库 slug 取覆盖文案 */
export function getOverride(slug: string): ProjectOverride | undefined {
  return projectOverrides[slug]
}
