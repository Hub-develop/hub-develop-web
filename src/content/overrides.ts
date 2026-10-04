/* ============================================================
 * 项目文案覆盖（双语，可选）
 * ------------------------------------------------------------
 * 站点项目卡 / 详情页的数据以 GitHub 为准（仓库数量、语言、topics、star…）。
 * 这里只用来「补充/覆盖」GitHub 上缺失的多语言介绍。
 *
 *   不写某个仓库也没关系 —— 会自动用 GitHub 的 description 兜底。
 *   写了 slug 对应的对象，就按这里的内容展示（按当前语言取 zh / en）。
 *
 * 修改方式：以仓库名的小写 slug 为 key（如 MChub → 'mchub'）。
 * 每个文本字段都是 { zh, en } 双语对象。
 * ============================================================ */

import type { Locale } from '@/i18n'

/** 双语文本 */
export type Tr = { zh: string; en: string }

export interface ProjectOverride {
  /** 卡片 / 详情页展示名（默认用仓库名） */
  name?: Tr
  /** 卡片左上角分类标签（默认用组织 label） */
  tag?: Tr
  /** 是否上首页「精选项目」 */
  featured?: boolean
  /** 卡片一句话简介（默认用 GitHub description） */
  summary?: Tr
  /** 详情页正文段落 */
  description?: Tr[]
  /** 详情页能力亮点 */
  highlights?: Tr[]
  /** 追加到 GitHub topics 之外的标签 */
  extraTags?: Tr[]
}

export const projectOverrides: Record<string, ProjectOverride> = {
  mchub: {
    name: { zh: 'MChub', en: 'MChub' },
    tag: { zh: '主线项目', en: 'Flagship' },
    featured: true,
    summary: {
      zh: '基于 .NET + Avalonia 的跨平台启动器组件，统一游戏与工具的一站式入口。',
      en: 'A cross-platform launcher toolkit built on .NET + Avalonia — a one-stop entry for games and tools.',
    },
    description: [
      {
        zh: 'MChub 是 Hub.code 当前的主线项目，目标是做一款原生、跨平台、体验一致的启动器，把启动、管理、更新这些琐事收进一个干净的界面里。',
        en: 'MChub is the current flagship of Hub.code. The goal is a native, cross-platform, consistent launcher that folds launching, management and updates into one clean interface.',
      },
      {
        zh: '技术栈以 .NET 为核心，配合 Avalonia 与 FluentAvalonia 构建界面，用一套代码同时覆盖 Windows、macOS 与 Linux，并保持各平台原生的窗口行为与视觉质感。',
        en: 'Built around .NET, with Avalonia and FluentAvalonia for the UI, a single codebase covers Windows, macOS and Linux while keeping each platform’s native window behavior and look.',
      },
      {
        zh: '项目坚持「功能必须真实可用」——不摆假的占位数据，每一个进度条、每一项状态都来自真实的系统调用。',
        en: 'The project insists that features must actually work — no fake placeholder data; every progress bar and status comes from a real system call.',
      },
    ],
    highlights: [
      { zh: '一套代码跨 Windows / macOS / Linux 三端运行', en: 'One codebase across Windows / macOS / Linux' },
      { zh: '基于 FluentAvalonia 的原生级视觉与窗口行为', en: 'Native-grade visuals and window behavior via FluentAvalonia' },
      { zh: '模块化的启动与管理流程，可插拔扩展', en: 'Modular, pluggable launch and management flow' },
      { zh: '坚持真实系统调用，拒绝占位假数据', en: 'Real system calls only — no placeholder data' },
    ],
  },

  codenet: {
    name: { zh: 'CodeNet', en: 'CodeNet' },
    tag: { zh: '运行时 / SDK', en: 'Runtime / SDK' },
    featured: true,
    summary: {
      zh: '提供 macOS 与 Linux 完整 SDK 的 .NET 运行时分支，并用 signal-based SEH 规避新版 macOS 的 EXC_GUARD 启动崩溃。',
      en: 'A .NET runtime fork shipping complete macOS & Linux SDKs, with a signal-based SEH fix for the EXC_GUARD launch crash on newer macOS.',
    },
    description: [
      {
        zh: 'CodeNet 是一个 .NET 运行时分支（fork），在提供 macOS 与 Linux 平台完整 SDK 的同时，针对新版 macOS 的启动崩溃问题给出专门修复。',
        en: 'CodeNet is a fork of the .NET runtime. Besides providing full SDKs for macOS and Linux, it ships a targeted fix for the launch-time crash on recent macOS.',
      },
      {
        zh: '在 macOS 27 上，原生 .NET 的 Mach exception 处理路径会触发 EXC_GUARD，被系统以 SIGKILL 终止，表现为「Failed to create CoreCLR」。CodeNet 改用基于信号的 SEH（signal-based structured exception handling）绕开这条路径。',
        en: 'On macOS 27, the upstream .NET Mach exception handling path triggers EXC_GUARD and is killed by the system with SIGKILL, surfacing as "Failed to create CoreCLR". CodeNet switches to signal-based SEH to bypass that path.',
      },
      {
        zh: '产物以 SDK 形式分发，配套 osx-arm64 / osx-x64 与 Linux 版本，可直接替换官方 SDK 使用。',
        en: 'Distributed as SDKs for osx-arm64, osx-x64 and Linux, it can replace the official .NET SDK directly.',
      },
    ],
    highlights: [
      { zh: '用 signal-based SEH 替代 Mach exception 路径，规避 EXC_GUARD', en: 'Signal-based SEH replaces the Mach exception path to avoid EXC_GUARD' },
      { zh: '覆盖 macOS 与 Linux 的完整 SDK 分发', en: 'Complete SDK distribution for macOS and Linux' },
      { zh: '可直接替换 .NET SDK，构建与运行行为保持一致', en: 'Drops in for the official .NET SDK; identical build & run behavior' },
    ],
  },

  'mcbeforemacos-codehub': {
    name: { zh: 'MCBEforMacOS', en: 'MCBEforMacOS' },
    tag: { zh: '跨平台运行', en: 'Cross-platform runtime' },
    featured: true,
    summary: {
      zh: '在 macOS 上运行《我的世界》基岩版（Windows GDK 版）的自包含运行时。',
      en: 'A self-contained runtime for running Minecraft Bedrock (Windows GDK build) on macOS.',
    },
    description: [
      {
        zh: 'MCBEforMacOS 是一套自包含运行时，目标是在 macOS 上直接跑起《我的世界》基岩版的 Windows GDK 版本。',
        en: 'MCBEforMacOS is a self-contained runtime that aims to run the Windows GDK build of Minecraft Bedrock directly on macOS.',
      },
      {
        zh: '方案把 Wine（WineGDK）、xodus-service 以及 MoltenVK / DXVK / vkd3d-proton 等图形转换层打包在一起，尽量做到开箱即用，不依赖用户自己折腾环境。',
        en: 'It bundles Wine (WineGDK), xodus-service and graphics translation layers like MoltenVK / DXVK / vkd3d-proton, aiming for an out-of-the-box experience without manual environment tinkering.',
      },
      {
        zh: '项目以 Shell 脚本组织构建与启动流程，把复杂的兼容层依赖收敛成一次可复现的安装。',
        en: 'Shell scripts organize the build and launch flow, collapsing the complex compatibility-layer dependencies into one reproducible install.',
      },
    ],
    highlights: [
      { zh: '自包含运行时：Wine(WineGDK) + xodus-service + 图形转换层', en: 'Self-contained runtime: Wine(WineGDK) + xodus-service + graphics layers' },
      { zh: 'MoltenVK / DXVK / vkd3d-proton 图形栈整合', en: 'MoltenVK / DXVK / vkd3d-proton graphics stack integrated' },
      { zh: '面向 macOS 的构建与启动流程，开箱即用', en: 'macOS-oriented build & launch flow, ready out of the box' },
    ],
  },

  'codehub-oreui': {
    name: { zh: 'CodeHub-OreUI', en: 'CodeHub-OreUI' },
    tag: { zh: 'UI 组件库', en: 'UI library' },
    summary: {
      zh: '为 Avalonia 12 打造的 Minecraft 基岩版 OreUI 风格控件库。',
      en: 'A Minecraft Bedrock OreUI-style control library for Avalonia 12.',
    },
    description: [
      {
        zh: 'CodeHub-OreUI 是一套 Avalonia 控件库，把《我的世界》基岩版 OreUI 的视觉语言带进 .NET 桌面应用。',
        en: 'CodeHub-OreUI is an Avalonia control library that brings the visual language of Minecraft Bedrock’s OreUI into .NET desktop apps.',
      },
      {
        zh: '它面向 Avalonia 12，提供贴近游戏内风格的按钮、面板等控件，方便为自己的工具做一套统一、带点游戏味的界面。',
        en: 'Targeting Avalonia 12, it provides in-game-style buttons, panels and more, so you can give your own tools a unified, game-flavored interface.',
      },
    ],
    highlights: [
      { zh: '复刻 Minecraft 基岩版 OreUI 的视觉风格', en: 'Recreates the look of Minecraft Bedrock’s OreUI' },
      { zh: '面向 Avalonia 12 的控件实现', en: 'Control implementations targeting Avalonia 12' },
    ],
  },

  'codehub-fluentui': {
    name: { zh: 'CodeHub-FluentUI', en: 'CodeHub-FluentUI' },
    tag: { zh: 'UI 组件库', en: 'UI library' },
    summary: {
      zh: '面向 Fluent Design 的 Avalonia 控件库，把更多 WinUI 控件带进 Avalonia。',
      en: 'A Fluent Design control library for Avalonia, bringing more WinUI controls into Avalonia.',
    },
    description: [
      {
        zh: 'CodeHub-FluentUI 是一个专注于 Fluent Design 的控件库，目标是把更多 WinUI 风格的控件带到 Avalonia 生态里。',
        en: 'CodeHub-FluentUI is a control library focused on Fluent Design, aiming to bring more WinUI-style controls into the Avalonia ecosystem.',
      },
      {
        zh: '它让跨平台 .NET 应用也能获得贴近 Windows 11 的视觉与交互，减少为每个平台单独适配的成本。',
        en: 'It lets cross-platform .NET apps get Windows 11-like visuals and interaction, reducing per-platform adaptation cost.',
      },
    ],
    highlights: [
      { zh: '聚焦 Fluent Design 的控件实现', en: 'Fluent Design-focused controls' },
      { zh: '将更多 WinUI 控件引入 Avalonia', en: 'Brings more WinUI controls into Avalonia' },
    ],
  },

  webhub: {
    name: { zh: 'WebHub', en: 'WebHub' },
    tag: { zh: 'Web / 安全', en: 'Web / Security' },
    summary: { zh: '浏览器', en: 'A browser' },
    description: [{ zh: 'WebHub 是一个基于.NET的浏览器.。', en: 'WebHub is a .NET-based browser.' }],
    highlights: [],
  },
}

/** 按仓库 slug 取覆盖文案（双语原始对象） */
export function getOverride(slug: string): ProjectOverride | undefined {
  return projectOverrides[slug]
}

/** 从双语字段按当前语言取值（未提供则回退空串） */
export function pickTr(tr: Tr | undefined, lang: Locale): string {
  if (!tr) return ''
  return tr[lang] ?? tr.zh ?? ''
}
