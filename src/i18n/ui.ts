/* ============================================================
 * Hub-develop · UI 文案字典（界面 chrome，非内容）
 * ------------------------------------------------------------
 * 页面正文 / 配置文案走 src/content/site.ts 的双语配置；
 * 这里只放按钮、标签、章节标题、占位等「界面壳」文字。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                       → 取当前语言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })  → 支持 {name} 占位替换
 * 未知 key 直接返回 key 本身（不会报错）。
 * ============================================================ */

import { locale } from './index'
import type { Locale } from './index'

type Dict = Record<string, string>

const zh: Dict = {
  /* 导航 / 通用 */
  'nav.menu': '切换菜单',
  'nav.github': 'GitHub',
  'lang.zh': '中文',
  'lang.en': 'EN',

  /* 首页 */
  'home.featuredTitle': '精选项目',
  'home.featuredLead': '我们正在积极开发与维护的部分项目。',
  'home.allProjects': '全部项目',
  'home.stackTitle': '技术栈与标签',
  'home.stackLead': '由 {n} 个公开仓库的语言分布实时聚合而来，覆盖 {m} 项技术栈、{k} 个组织标签。',
  'home.repoUnit': '仓库',
  'home.orgTags': '组织标签',
  'home.aboutTitle': '关于 {name}',
  'home.learnMore': '了解更多',
  'home.ctaTitle': '想一起做点什么？',
  'home.ctaLead': '无论是反馈问题、交流技术，还是加入协作，都欢迎找到我们。',
  'home.contactUs': '联系我们',
  'home.followGithub': '在 GitHub 关注',

  /* 关于页 */
  'about.focusTitle': '专注方向',
  'about.focusLead': '我们把精力集中在四个方向，每个方向都有对应的项目在支撑。',
  'about.principlesTitle': '我们坚持的原则',
  'about.principlesKicker': '// principles',
  'about.ctaTitle': '想看我们做了什么？',
  'about.ctaLead': '项目页里有全部正在开发和维护的项目。',
  'about.browse': '浏览项目',
  'about.contact': '联系我们',
  'about.focusKicker': '// focus',

  /* 联系页 */
  'contact.emailLabel': '邮箱地址',
  'contact.copy': '复制',
  'contact.copied': '已复制',
  'contact.ready': '准备好了吗？',
  'contact.ctaLead': '前往 GitHub 组织，挑一个你感兴趣的项目开始吧。',
  'contact.openGithub': '打开 GitHub 组织',
  'contact.joinKicker': '// join',

  /* 项目列表页 */
  'projects.title': '核心项目',
  'projects.lead': '{name} 正在开发与维护的开源项目，覆盖跨平台桌面、服务端、文档框架与操作系统等方向。',
  'projects.all': '全部',
  'projects.other': '其他',
  'projects.count': '{n} 个项目',
  'projects.empty': '这个分类下暂时没有项目。',
  'projects.tailTitle': '有想法，或发现问题？',
  'projects.tailLead': '在对应仓库提 Issue 是参与进来最快的方式。',
  'projects.openGithub': '前往 GitHub 组织',
  'projects.kicker': '// projects',

  /* 项目详情页 */
  'detail.home': '首页',
  'detail.projects': '项目',
  'detail.backList': '返回列表',
  'detail.aboutTitle': '项目简介',
  'detail.highlights': '能力亮点',
  'detail.status': '状态',
  'detail.stack': '技术栈',
  'detail.githubData': 'GitHub 数据',
  'detail.language': '语言',
  'detail.star': 'Star',
  'detail.fork': 'Fork',
  'detail.issues': 'Issues',
  'detail.size': '体积',
  'detail.license': '许可证',
  'detail.updated': '最近更新',
  'detail.links': '相关链接',
  'detail.prev': '上一个',
  'detail.next': '下一个',
  'detail.missingTitle': '找不到这个项目',
  'detail.missingLead': 'slug「{slug}」不在项目列表中。',
  'detail.browseAll': '浏览全部项目',

  /* 404 */
  'nf.text': '你要找的页面不存在，或者已经被移动到别处了。',
  'nf.home': '回到首页',
  'nf.projects': '看看项目',

  /* 组件 */
  'card.viewDetails': '查看详情',
  'card.updated': '更新于',
  'backToTop': '回到顶部',
}

const en: Dict = {
  /* nav / common */
  'nav.menu': 'Toggle menu',
  'nav.github': 'GitHub',
  'lang.zh': '中文',
  'lang.en': 'EN',

  /* home */
  'home.featuredTitle': 'Featured projects',
  'home.featuredLead': 'Some of the projects we are actively building and maintaining.',
  'home.allProjects': 'All projects',
  'home.stackTitle': 'Stacks & tags',
  'home.stackLead':
    'Aggregated live from the language profiles of {n} public repos, spanning {m} stacks and {k} org tags.',
  'home.repoUnit': 'repos',
  'home.orgTags': 'Org tags',
  'home.aboutTitle': 'About {name}',
  'home.learnMore': 'Learn more',
  'home.ctaTitle': "Want to build something together?",
  'home.ctaLead': 'Whether you want to report a bug, talk tech, or join in — we would love to hear from you.',
  'home.contactUs': 'Contact us',
  'home.followGithub': 'Follow on GitHub',

  /* about */
  'about.focusTitle': 'Focus areas',
  'about.focusLead': 'We concentrate on four directions, each backed by its own projects.',
  'about.principlesTitle': 'Principles we hold to',
  'about.principlesKicker': '// principles',
  'about.ctaTitle': 'Want to see what we built?',
  'about.ctaLead': 'The projects page lists everything we are building and maintaining.',
  'about.browse': 'Browse projects',
  'about.contact': 'Contact us',
  'about.focusKicker': '// focus',

  /* contact */
  'contact.emailLabel': 'Email',
  'contact.copy': 'Copy',
  'contact.copied': 'Copied',
  'contact.ready': 'Ready to start?',
  'contact.ctaLead': 'Head to the GitHub org and pick a project you find interesting.',
  'contact.openGithub': 'Open the GitHub org',
  'contact.joinKicker': '// join',

  /* projects list */
  'projects.title': 'Core projects',
  'projects.lead':
    '{name} builds and maintains open-source projects across cross-platform desktop, server, doc frameworks and operating systems.',
  'projects.all': 'All',
  'projects.other': 'Other',
  'projects.count': '{n} projects',
  'projects.empty': 'No projects in this category yet.',
  'projects.tailTitle': 'Got an idea, or found a bug?',
  'projects.tailLead': 'Opening an Issue on the repo is the fastest way to get involved.',
  'projects.openGithub': 'Go to the GitHub org',
  'projects.kicker': '// projects',

  /* project detail */
  'detail.home': 'Home',
  'detail.projects': 'Projects',
  'detail.backList': 'Back to list',
  'detail.aboutTitle': 'Overview',
  'detail.highlights': 'Highlights',
  'detail.status': 'Status',
  'detail.stack': 'Stack',
  'detail.githubData': 'GitHub data',
  'detail.language': 'Language',
  'detail.star': 'Star',
  'detail.fork': 'Fork',
  'detail.issues': 'Issues',
  'detail.size': 'Size',
  'detail.license': 'License',
  'detail.updated': 'Last updated',
  'detail.links': 'Links',
  'detail.prev': 'Previous',
  'detail.next': 'Next',
  'detail.missingTitle': 'Project not found',
  'detail.missingLead': 'slug "{slug}" is not in the project list.',
  'detail.browseAll': 'Browse all projects',

  /* 404 */
  'nf.text': 'The page you are looking for does not exist, or has moved elsewhere.',
  'nf.home': 'Back home',
  'nf.projects': 'See projects',

  /* components */
  'card.viewDetails': 'View details',
  'card.updated': 'Updated',
  'backToTop': 'Back to top',
}

const tables: Record<Locale, Dict> = { zh, en }

export function t(key: string, params?: Record<string, string | number>): string {
  const table = tables[locale.value] ?? zh
  let str = table[key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return str
}
