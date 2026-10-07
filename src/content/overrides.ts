/* ============================================================
 * 项目文案覆盖（多语言，可选）
 * ------------------------------------------------------------
 * 站点项目卡 / 详情页的数据以 GitHub 为准（仓库数量、语言、topics、star…）。
 * 这里只用来「补充/覆盖」GitHub 上缺失的多语言介绍。
 *
 *   不写某个仓库也没关系 —— 会自动用 GitHub 的 description 兜底。
 *   写了 slug 对应的对象，就按这里的内容展示（按当前语言取对应译文）。
 *
 * 修改方式：以仓库名的小写 slug 为 key（如 MChub → 'mchub'）。
 * 每个文本字段都是 Partial<Record<Locale, string>>（zh/zht/en/ja/ko），
 * 缺译时自动回退 en，再回退 zh。
 * ============================================================ */

import { DEFAULT_LOCALE, type Locale } from '@/i18n'

/** 多语言文本（按需提供，缺译回退 DEFAULT_LOCALE → zh） */
export type Tr = Partial<Record<Locale, string>>

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
    name: { zh: 'MChub', zht: 'MChub', en: 'MChub', ja: 'MChub', ko: 'MChub' },
    tag: { zh: '主线项目', zht: '主線項目', en: 'Flagship', ja: '主力プロジェクト', ko: '핵심 프로젝트' },
    featured: true,
    summary: {
      zh: '基于 .NET + Avalonia 的跨平台启动器组件，统一游戏与工具的一站式入口。',
      zht: '基於 .NET + Avalonia 的跨平台啟動器組件，統一遊戲與工具的一站式入口。',
      en: 'A cross-platform launcher toolkit built on .NET + Avalonia — a one-stop entry for games and tools.',
      ja: '.NET + Avalonia ベースのクロスプラットフォーム起動ツールキット。ゲームとツールを一箇所にまとめる入り口。',
      ko: '.NET + Avalonia 기반의 크로스 플랫폼 런처 툴킷. 게임과 도구를 한곳에서 시작할 수 있는 관문.',
    },
    description: [
      {
        zh: 'MChub 是 Hub.code 当前的主线项目，目标是做一款原生、跨平台、体验一致的启动器，把启动、管理、更新这些琐事收进一个干净的界面里。',
        zht: 'MChub 是 Hub.code 目前的主線項目，目標是做一款原生、跨平台、體驗一致的啟動器，把啟動、管理、更新這些瑣事收進一個乾淨的介面裡。',
        en: 'MChub is the current flagship of Hub.code. The goal is a native, cross-platform, consistent launcher that folds launching, management and updates into one clean interface.',
        ja: 'MChub は現在 Hub.code の主力プロジェクトです。目標は、起動・管理・更新といった煩雑な作業を一つの洗練された画面にまとめる、ネイティブでクロスプラットフォームな一貫したランチャーを作ること。',
        ko: 'MChub는 현재 Hub.code의 핵심 프로젝트입니다. 목표는 실행·관리·업데이트 같은 번거로운 작업을 하나의 깔끔한 화면에 담는, 네이티브 크로스 플랫폼 런처를 만드는 것입니다.',
      },
      {
        zh: '技术栈以 .NET 为核心，配合 Avalonia 与 FluentAvalonia 构建界面，用一套代码同时覆盖 Windows、macOS 与 Linux，并保持各平台原生的窗口行为与视觉质感。',
        zht: '技術棧以 .NET 為核心，配合 Avalonia 與 FluentAvalonia 構建介面，用一套程式碼同時覆蓋 Windows、macOS 與 Linux，並保持各平台原生的視窗行為與視覺質感。',
        en: 'Built around .NET, with Avalonia and FluentAvalonia for the UI, a single codebase covers Windows, macOS and Linux while keeping each platform’s native window behavior and look.',
        ja: '.NET を中心に、UI には Avalonia と FluentAvalonia を採用。単一のコードベースで Windows・macOS・Linux をカバーしつつ、各プラットフォームのネイティブなウィンドウ挙動と見た目を維持します。',
        ko: '.NET을 중심으로 UI에는 Avalonia와 FluentAvalonia를 사용합니다. 단일 코드베이스로 Windows·macOS·Linux를 모두 커버하면서도 각 플랫폼의 네이티브 창 동작과 외형을 유지합니다.',
      },
      {
        zh: '项目坚持「功能必须真实可用」——不摆假的占位数据，每一个进度条、每一项状态都来自真实的系统调用。',
        zht: '項目堅持「功能必須真實可用」——不擺假的佔位數據，每一個進度條、每一項狀態都來自真實的系統呼叫。',
        en: 'The project insists that features must actually work — no fake placeholder data; every progress bar and status comes from a real system call.',
        ja: 'このプロジェクトは「機能は実際に動くこと」を徹底します。偽のプレースホルダーは使わず、すべての進行状況や状態は本物のシステム呼び出しから得られます。',
        ko: '이 프로젝트는 "기능은 실제로 동작해야 한다"를 고집합니다. 가짜 플레이스홀더는 쓰지 않으며, 모든 진행률과 상태는 실제 시스템 호출에서 비롯됩니다.',
      },
    ],
    highlights: [
      { zh: '一套代码跨 Windows / macOS / Linux 三端运行', zht: '一套程式碼跨 Windows / macOS / Linux 三端運行', en: 'One codebase across Windows / macOS / Linux', ja: '単一コードベースで Windows / macOS / Linux の 3 プラットフォーム', ko: '단일 코드베이스로 Windows / macOS / Linux 지원' },
      { zh: '基于 FluentAvalonia 的原生级视觉与窗口行为', zht: '基於 FluentAvalonia 的原生級視覺與視窗行為', en: 'Native-grade visuals and window behavior via FluentAvalonia', ja: 'FluentAvalonia によるネイティブ級の見た目とウィンドウ挙動', ko: 'FluentAvalonia 기반의 네이티브급 비주얼과 창 동작' },
      { zh: '模块化的启动与管理流程，可插拔扩展', zht: '模組化的啟動與管理流程，可插拔擴展', en: 'Modular, pluggable launch and management flow', ja: 'モジュール式で拡張可能な起動・管理フロー', ko: '모듈형·플러그인 가능한 실행 및 관리 흐름' },
      { zh: '坚持真实系统调用，拒绝占位假数据', zht: '堅持真實系統呼叫，拒絕佔位假數據', en: 'Real system calls only — no placeholder data', ja: '実際のシステム呼び出しのみ。プレースホルダーは拒否', ko: '실제 시스템 호출만 사용 — 플레이스홀더 없음' },
    ],
  },

  codenet: {
    name: { zh: 'CodeNet', zht: 'CodeNet', en: 'CodeNet', ja: 'CodeNet', ko: 'CodeNet' },
    tag: { zh: '运行时 / SDK', zht: '運行時 / SDK', en: 'Runtime / SDK', ja: 'ランタイム / SDK', ko: '런타임 / SDK' },
    featured: true,
    summary: {
      zh: '提供 macOS 与 Linux 完整 SDK 的 .NET 运行时分支，并用 signal-based SEH 规避新版 macOS 的 EXC_GUARD 启动崩溃。',
      zht: '提供 macOS 與 Linux 完整 SDK 的 .NET 運行時分支，並用 signal-based SEH 規避新版 macOS 的 EXC_GUARD 啟動崩潰。',
      en: 'A .NET runtime fork shipping complete macOS & Linux SDKs, with a signal-based SEH fix for the EXC_GUARD launch crash on newer macOS.',
      ja: 'macOS と Linux 向けの完全な SDK を提供する .NET ランタイムのフォーク。新しい macOS の EXC_GUARD 起動クラッシュを signal-based SEH で回避。',
      ko: 'macOS와 Linux용 완전한 SDK를 제공하는 .NET 런타임 포크. 새 macOS의 EXC_GUARD 시작 크래시를 signal-based SEH로 회피.',
    },
    description: [
      {
        zh: 'CodeNet 是一个 .NET 运行时分支（fork），在提供 macOS 与 Linux 平台完整 SDK 的同时，针对新版 macOS 的启动崩溃问题给出专门修复。',
        zht: 'CodeNet 是一個 .NET 運行時分支（fork），在提供 macOS 與 Linux 平台完整 SDK 的同時，針對新版 macOS 的啟動崩潰問題給出專門修復。',
        en: 'CodeNet is a fork of the .NET runtime. Besides providing full SDKs for macOS and Linux, it ships a targeted fix for the launch-time crash on recent macOS.',
        ja: 'CodeNet は .NET ランタイムのフォークです。macOS と Linux 向けの完全な SDK を提供するほか、最近の macOS での起動時クラッシュに特化した修正を含みます。',
        ko: 'CodeNet은 .NET 런타임의 포크입니다. macOS와 Linux용 완전한 SDK를 제공할 뿐 아니라, 최신 macOS에서의 시작 크래시에 맞춤형 수정도 포함합니다.',
      },
      {
        zh: '在 macOS 27 上，原生 .NET 的 Mach exception 处理路径会触发 EXC_GUARD，被系统以 SIGKILL 终止，表现为「Failed to create CoreCLR」。CodeNet 改用基于信号的 SEH（signal-based structured exception handling）绕开这条路径。',
        zht: '在 macOS 27 上，原生 .NET 的 Mach exception 處理路徑會觸發 EXC_GUARD，被系統以 SIGKILL 終止，表現為「Failed to create CoreCLR」。CodeNet 改用基於信號的 SEH（signal-based structured exception handling）繞開這條路徑。',
        en: 'On macOS 27, the upstream .NET Mach exception handling path triggers EXC_GUARD and is killed by the system with SIGKILL, surfacing as "Failed to create CoreCLR". CodeNet switches to signal-based SEH to bypass that path.',
        ja: 'macOS 27 では、上流の .NET の Mach 例外処理経路が EXC_GUARD を引き起こし、システムから SIGKILL で終了され、「Failed to create CoreCLR」となります。CodeNet は signal-based SEH に切り替えてこの経路を回避します。',
        ko: 'macOS 27에서 상위 .NET의 Mach 예외 처리 경로는 EXC_GUARD를 유발해 시스템이 SIGKILL로 종료하며 "Failed to create CoreCLR"로 나타납니다. CodeNet은 signal-based SEH로 전환해 이 경로를 우회합니다.',
      },
      {
        zh: '产物以 SDK 形式分发，配套 osx-arm64 / osx-x64 与 Linux 版本，可直接替换官方 SDK 使用。',
        zht: '產物以 SDK 形式分發，配套 osx-arm64 / osx-x64 與 Linux 版本，可直接替換官方 SDK 使用。',
        en: 'Distributed as SDKs for osx-arm64, osx-x64 and Linux, it can replace the official .NET SDK directly.',
        ja: '成果物は osx-arm64・osx-x64・Linux 向けの SDK として配布され、公式の .NET SDK をそのまま置き換えられます。',
        ko: 'osx-arm64·osx-x64·Linux용 SDK로 배포되며, 공식 .NET SDK를 그대로 대체할 수 있습니다.',
      },
    ],
    highlights: [
      { zh: '用 signal-based SEH 替代 Mach exception 路径，规避 EXC_GUARD', zht: '用 signal-based SEH 替代 Mach exception 路徑，規避 EXC_GUARD', en: 'Signal-based SEH replaces the Mach exception path to avoid EXC_GUARD', ja: 'Mach 例外経路を signal-based SEH に置き換え、EXC_GUARD を回避', ko: 'Mach 예외 경로를 signal-based SEH로 대체해 EXC_GUARD 회피' },
      { zh: '覆盖 macOS 与 Linux 的完整 SDK 分发', zht: '覆蓋 macOS 與 Linux 的完整 SDK 分發', en: 'Complete SDK distribution for macOS and Linux', ja: 'macOS と Linux 向けの完全な SDK 配布', ko: 'macOS와 Linux용 완전한 SDK 배포' },
      { zh: '可直接替换 .NET SDK，构建与运行行为保持一致', zht: '可直接替換 .NET SDK，構建與運行行為保持一致', en: 'Drops in for the official .NET SDK; identical build & run behavior', ja: '公式 .NET SDK をそのまま置き換え。ビルド・実行挙動は同一', ko: '공식 .NET SDK를 그대로 대체. 빌드·실행 동작 동일' },
    ],
  },

  'mcbeforemacos-codehub': {
    name: { zh: 'MCBEforMacOS', zht: 'MCBEforMacOS', en: 'MCBEforMacOS', ja: 'MCBEforMacOS', ko: 'MCBEforMacOS' },
    tag: { zh: '跨平台运行', zht: '跨平台運行', en: 'Cross-platform runtime', ja: 'クロスプラットフォーム実行', ko: '크로스 플랫폼 실행' },
    featured: true,
    summary: {
      zh: '在 macOS 上运行《我的世界》基岩版（Windows GDK 版）的自包含运行时。',
      zht: '在 macOS 上運行《我的世界》基岩版（Windows GDK 版）的自包含運行時。',
      en: 'A self-contained runtime for running Minecraft Bedrock (Windows GDK build) on macOS.',
      ja: 'macOS 上で Minecraft Bedrock（Windows GDK 版）を動かす、自己完結型のランタイム。',
      ko: 'macOS에서 마인크래프트 베드락(Windows GDK 빌드)을 실행하는 자체 완결형 런타임.',
    },
    description: [
      {
        zh: 'MCBEforMacOS 是一套自包含运行时，目标是在 macOS 上直接跑起《我的世界》基岩版的 Windows GDK 版本。',
        zht: 'MCBEforMacOS 是一套自包含運行時，目標是在 macOS 上直接跑起《我的世界》基岩版的 Windows GDK 版本。',
        en: 'MCBEforMacOS is a self-contained runtime that aims to run the Windows GDK build of Minecraft Bedrock directly on macOS.',
        ja: 'MCBEforMacOS は自己完結型ランタイムで、macOS 上で Minecraft Bedrock の Windows GDK 版をそのまま動かすことを目指します。',
        ko: 'MCBEforMacOS는 자체 완결형 런타임으로, macOS에서 마인크래프트 베드락의 Windows GDK 버전을 바로 실행하는 것을 목표로 합니다.',
      },
      {
        zh: '方案把 Wine（WineGDK）、xodus-service 以及 MoltenVK / DXVK / vkd3d-proton 等图形转换层打包在一起，尽量做到开箱即用，不依赖用户自己折腾环境。',
        zht: '方案把 Wine（WineGDK）、xodus-service 以及 MoltenVK / DXVK / vkd3d-proton 等圖形轉換層打包在一起，盡量做到開箱即用，不依賴用戶自己折騰環境。',
        en: 'It bundles Wine (WineGDK), xodus-service and graphics translation layers like MoltenVK / DXVK / vkd3d-proton, aiming for an out-of-the-box experience without manual environment tinkering.',
        ja: 'Wine (WineGDK)・xodus-service・MoltenVK / DXVK / vkd3d-proton といったグラフィックス変換層をまとめ、環境を自分でいじらずにそのまま使えることを目指します。',
        ko: 'Wine(WineGDK)·xodus-service·MoltenVK / DXVK / vkd3d-proton 같은 그래픽 변환 계층을 묶어, 사용자가 직접 환경을 꾸미지 않아도 바로 쓸 수 있도록 합니다.',
      },
      {
        zh: '项目以 Shell 脚本组织构建与启动流程，把复杂的兼容层依赖收敛成一次可复现的安装。',
        zht: '項目以 Shell 腳本組織構建與啟動流程，把複雜的相容層依賴收斂成一次可復現的安裝。',
        en: 'Shell scripts organize the build and launch flow, collapsing the complex compatibility-layer dependencies into one reproducible install.',
        ja: 'Shell スクリプトでビルドと起動の流れを整理し、複雑な互換層の依存を一度の再現可能なインストールにまとめます。',
        ko: 'Shell 스크립트로 빌드와 실행 흐름을 정리해, 복잡한 호환 계층 의존성을 한 번에 재현 가능한 설치로 모읍니다.',
      },
    ],
    highlights: [
      { zh: '自包含运行时：Wine(WineGDK) + xodus-service + 图形转换层', zht: '自包含運行時：Wine(WineGDK) + xodus-service + 圖形轉換層', en: 'Self-contained runtime: Wine(WineGDK) + xodus-service + graphics layers', ja: '自己完結型ランタイム：Wine(WineGDK) + xodus-service + グラフィックス層', ko: '자체 완결형 런타임: Wine(WineGDK) + xodus-service + 그래픽 계층' },
      { zh: 'MoltenVK / DXVK / vkd3d-proton 图形栈整合', zht: 'MoltenVK / DXVK / vkd3d-proton 圖形棧整合', en: 'MoltenVK / DXVK / vkd3d-proton graphics stack integrated', ja: 'MoltenVK / DXVK / vkd3d-proton グラフィックススタック統合', ko: 'MoltenVK / DXVK / vkd3d-proton 그래픽 스택 통합' },
      { zh: '面向 macOS 的构建与启动流程，开箱即用', zht: '面向 macOS 的構建與啟動流程，開箱即用', en: 'macOS-oriented build & launch flow, ready out of the box', ja: 'macOS 向けのビルド・起動フロー。すぐに使える', ko: 'macOS 지향 빌드·실행 흐름, 즉시 사용 가능' },
    ],
  },

  'codehub-oreui': {
    name: { zh: 'CodeHub-OreUI', zht: 'CodeHub-OreUI', en: 'CodeHub-OreUI', ja: 'CodeHub-OreUI', ko: 'CodeHub-OreUI' },
    tag: { zh: 'UI 组件库', zht: 'UI 組件庫', en: 'UI library', ja: 'UI コンポーネントライブラリ', ko: 'UI 컴포넌트 라이브러리' },
    summary: {
      zh: '为 Avalonia 12 打造的 Minecraft 基岩版 OreUI 风格控件库。',
      zht: '為 Avalonia 12 打造的 Minecraft 基岩版 OreUI 風格控件庫。',
      en: 'A Minecraft Bedrock OreUI-style control library for Avalonia 12.',
      ja: 'Avalonia 12 向けの、Minecraft Bedrock の OreUI 風コントロールライブラリ。',
      ko: 'Avalonia 12용 마인크래프트 베드락 OreUI 스타일 컨트롤 라이브러리.',
    },
    description: [
      {
        zh: 'CodeHub-OreUI 是一套 Avalonia 控件库，把《我的世界》基岩版 OreUI 的视觉语言带进 .NET 桌面应用。',
        zht: 'CodeHub-OreUI 是一套 Avalonia 控件庫，把《我的世界》基岩版 OreUI 的視覺語言帶進 .NET 桌面應用。',
        en: 'CodeHub-OreUI is an Avalonia control library that brings the visual language of Minecraft Bedrock’s OreUI into .NET desktop apps.',
        ja: 'CodeHub-OreUI は Avalonia コントロールライブラ리で、Minecraft Bedrock の OreUI の視覚言語を .NET デスクトップアプリに取り込みます。',
        ko: 'CodeHub-OreUI는 Avalonia 컨트롤 라이브러리로, 마인크래프트 베드락의 OreUI 비주얼 언어를 .NET 데스크톱 앱으로 가져옵니다.',
      },
      {
        zh: '它面向 Avalonia 12，提供贴近游戏内风格的按钮、面板等控件，方便为自己的工具做一套统一、带点游戏味的界面。',
        zht: '它面向 Avalonia 12，提供貼近遊戲內風格的按鈕、面板等控件，方便為自己的工具做一套統一、帶點遊戲味的介面。',
        en: 'Targeting Avalonia 12, it provides in-game-style buttons, panels and more, so you can give your own tools a unified, game-flavored interface.',
        ja: 'Avalonia 12 向けで、ゲーム内風のボタンやパネルなどを提供。自分のツールに統一感のあるゲームらしい画面を簡単に持たせられます。',
        ko: 'Avalonia 12를 대상으로 게임 내 스타일의 버튼·패널 등을 제공해, 자신의 도구에 통일감 있는 게임풍 화면을 쉽게 입힐 수 있습니다.',
      },
    ],
    highlights: [
      { zh: '复刻 Minecraft 基岩版 OreUI 的视觉风格', zht: '複刻 Minecraft 基岩版 OreUI 的視覺風格', en: 'Recreates the look of Minecraft Bedrock’s OreUI', ja: 'Minecraft Bedrock の OreUI の見た目を再現', ko: '마인크래프트 베드락 OreUI의 외형 재현' },
      { zh: '面向 Avalonia 12 的控件实现', zht: '面向 Avalonia 12 的控件實現', en: 'Control implementations targeting Avalonia 12', ja: 'Avalonia 12 向けのコントロール実装', ko: 'Avalonia 12용 컨트롤 구현' },
    ],
  },

  'codehub-fluentui': {
    name: { zh: 'CodeHub-FluentUI', zht: 'CodeHub-FluentUI', en: 'CodeHub-FluentUI', ja: 'CodeHub-FluentUI', ko: 'CodeHub-FluentUI' },
    tag: { zh: 'UI 组件库', zht: 'UI 組件庫', en: 'UI library', ja: 'UI コンポーネントライブラリ', ko: 'UI 컴포넌트 라이브러리' },
    summary: {
      zh: '面向 Fluent Design 的 Avalonia 控件库，把更多 WinUI 控件带进 Avalonia。',
      zht: '面向 Fluent Design 的 Avalonia 控件庫，把更多 WinUI 控件帶進 Avalonia。',
      en: 'A Fluent Design control library for Avalonia, bringing more WinUI controls into Avalonia.',
      ja: 'Fluent Design 向けの Avalonia コントロールライブラリ。より多くの WinUI コントロールを Avalonia へ。',
      ko: 'Fluent Design 기반의 Avalonia 컨트롤 라이브러리. 더 많은 WinUI 컨트롤을 Avalonia로.',
    },
    description: [
      {
        zh: 'CodeHub-FluentUI 是一个专注于 Fluent Design 的控件库，目标是把更多 WinUI 风格的控件带到 Avalonia 生态里。',
        zht: 'CodeHub-FluentUI 是一個專注於 Fluent Design 的控件庫，目標是把更多 WinUI 風格的控件帶到 Avalonia 生態裡。',
        en: 'CodeHub-FluentUI is a control library focused on Fluent Design, aiming to bring more WinUI-style controls into the Avalonia ecosystem.',
        ja: 'CodeHub-FluentUI は Fluent Design に特化したコントロールライブラリ。より多くの WinUI 風コントロールを Avalonia エコシステムへもたらすことが目標です。',
        ko: 'CodeHub-FluentUI는 Fluent Design에 특화된 컨트롤 라이브러리로, 더 많은 WinUI 스타일 컨트롤을 Avalonia 생태계로 가져오는 것이 목표입니다.',
      },
      {
        zh: '它让跨平台 .NET 应用也能获得贴近 Windows 11 的视觉与交互，减少为每个平台单独适配的成本。',
        zht: '它讓跨平台 .NET 應用也能獲得貼近 Windows 11 的視覺與互動，減少為每個平台單獨適配的成本。',
        en: 'It lets cross-platform .NET apps get Windows 11-like visuals and interaction, reducing per-platform adaptation cost.',
        ja: 'クロスプラットフォームの .NET アプリでも Windows 11 に近い見た目と操作感を得られ、プラットフォームごとの個別対応コストを減らします。',
        ko: '크로스 플랫폼 .NET 앱도 Windows 11에 가까운 비주얼과 상호작용을 얻어, 플랫폼별 개별 대응 비용을 줄입니다.',
      },
    ],
    highlights: [
      { zh: '聚焦 Fluent Design 的控件实现', zht: '聚焦 Fluent Design 的控件實現', en: 'Fluent Design-focused controls', ja: 'Fluent Design に特化したコントロール', ko: 'Fluent Design 중심 컨트롤' },
      { zh: '将更多 WinUI 控件引入 Avalonia', zht: '將更多 WinUI 控件引入 Avalonia', en: 'Brings more WinUI controls into Avalonia', ja: 'より多くの WinUI コントロールを Avalonia へ', ko: '더 많은 WinUI 컨트롤을 Avalonia로' },
    ],
  },

  webhub: {
    name: { zh: 'WebHub', zht: 'WebHub', en: 'WebHub', ja: 'WebHub', ko: 'WebHub' },
    tag: { zh: 'Web / 安全', zht: 'Web / 安全', en: 'Web / Security', ja: 'Web / セキュリティ', ko: 'Web / 보안' },
    summary: { zh: '浏览器', zht: '瀏覽器', en: 'A browser', ja: 'ブラウザ', ko: '브라우저' },
    description: [
      { zh: 'WebHub 是一个基于.NET的浏览器。', zht: 'WebHub 是一個基於.NET的瀏覽器。', en: 'WebHub is a .NET-based browser.', ja: 'WebHub は .NET ベースのブラウザです。', ko: 'WebHub는 .NET 기반의 브라우저입니다.' },
    ],
    highlights: [],
  },
}

/** 按仓库 slug 取覆盖文案（多语言原始对象） */
export function getOverride(slug: string): ProjectOverride | undefined {
  return projectOverrides[slug]
}

/**
 * 从多语言字段按当前语言取值。
 * 回退顺序：请求语言 → DEFAULT_LOCALE(en) → zh → 空串。
 */
export function pickTr(tr: Tr | undefined, lang: Locale): string {
  if (!tr) return ''
  return tr[lang] ?? tr[DEFAULT_LOCALE] ?? tr.zh ?? ''
}
