export interface Project {
  name: string
  tag: string
  description: string
  stack: string[]
  status: 'active' | 'maintained' | 'beta'
  repo: string
}

export const projects: Project[] = [
  {
    name: 'MChub',
    tag: '主线项目',
    description:
      '基于 .NET 10 + Avalonia + FluentAvalonia 的跨平台桌面启动器，统一游戏与工具的一站式入口。',
    stack: ['.NET 10', 'Avalonia', 'FluentAvalonia'],
    status: 'active',
    repo: 'https://github.com/Hub-develop',
  },
  {
    name: 'open-panel',
    tag: '多平台',
    description:
      'Flutter + Melos 单仓架构的远程控制软件，支持 iOS/Android/Windows/macOS/Linux，含真实系统监控与终端执行。',
    stack: ['Flutter', 'Dart', 'QML'],
    status: 'active',
    repo: 'https://github.com/Hub-develop',
  },
  {
    name: 'JVM-MCL-Server',
    tag: '服务端',
    description:
      '无 UI 服务端启动器 + 网页控制面板（Spring Boot + React），一键拉起 10 种核心服务端并容器化部署。',
    stack: ['Spring Boot', 'React', 'Docker'],
    status: 'active',
    repo: 'https://github.com/Hub-develop',
  },
  {
    name: 'OWD.K-MD3',
    tag: '文档框架',
    description:
      '自主文档框架，基于 Material Design 3 + marked.js，config 驱动、跨项目侧边栏互通、主题可定制。',
    stack: ['HTML5', 'CSS3', 'TypeScript'],
    status: 'maintained',
    repo: 'https://github.com/Hub-develop',
  },
  {
    name: 'OpenOS',
    tag: '操作系统',
    description:
      '基于 ChromiumOS 衍生的开源操作系统，移除 Google 服务、加入 Android 支持并制作 apt 移植版。',
    stack: ['ChromiumOS', 'Linux', 'Android'],
    status: 'beta',
    repo: 'https://github.com/Hub-develop',
  },
  {
    name: 'BugTracker',
    tag: '协作工具',
    description:
      '基于 GitHub Issues 构建的 SPA 管理界面，标准 OAuth 登录、站内操作闭环、MC Bug Tracker 风格模板。',
    stack: ['TypeScript', 'OAuth', 'SPA'],
    status: 'active',
    repo: 'https://github.com/Hub-develop',
  },
]
