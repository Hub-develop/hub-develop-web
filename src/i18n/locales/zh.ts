/* ============================================================
 * Hub-develop · 界面文案（中文）
 * ------------------------------------------------------------
 * 仅放按钮、标签、章节标题、占位等「界面壳」文字；
 * 页面正文 / 配置文案走 src/content/site.ts 的双语配置。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                        → 取当前语言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })   → 支持 {name} 占位替换
 * 未知 key 直接返回 key 本身（不会报错）。
 * ============================================================ */

export const zh: Record<string, string> = {
  /* 导航 / 通用 */
  'nav.menu': '切换菜单',
  'nav.github': 'GitHub',

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
