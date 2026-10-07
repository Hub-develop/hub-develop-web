/* ============================================================
 * Hub-develop · 界面文案（繁體中文）
 * ------------------------------------------------------------
 * 僅放按鈕、標籤、章節標題、佔位等「介面殼」文字；
 * 頁面正文 / 配置文案走 src/content/site.ts 的多語言配置。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                        → 取當前語言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })   → 支援 {name} 佔位替換
 * 未知 key 直接回傳 key 本身（不會報錯）。
 * ============================================================ */

export const zht: Record<string, string> = {
  /* 導覽 / 通用 */
  'nav.menu': '切換選單',
  'nav.github': 'GitHub',

  /* 首頁 */
  'home.featuredTitle': '精選項目',
  'home.featuredLead': '我們正在積極開發與維護的部分項目。',
  'home.allProjects': '全部項目',
  'home.stackTitle': '技術棧與標籤',
  'home.stackLead': '由 {n} 個公開倉庫的語言分佈即時聚合而來，覆蓋 {m} 項技術棧、{k} 個組織標籤。',
  'home.repoUnit': '倉庫',
  'home.orgTags': '組織標籤',
  'home.aboutTitle': '關於 {name}',
  'home.learnMore': '瞭解更多',
  'home.ctaTitle': '想一起做點什麼？',
  'home.ctaLead': '無論是反饋問題、交流技術，還是加入協作，都歡迎找到我們。',
  'home.contactUs': '聯繫我們',
  'home.followGithub': '在 GitHub 關注',

  /* 關於頁 */
  'about.focusTitle': '專注方向',
  'about.focusLead': '我們把精力集中在四個方向，每個方向都有對應的項目在支撐。',
  'about.principlesTitle': '我們堅持的原則',
  'about.principlesKicker': '// principles',
  'about.ctaTitle': '想看我們做了什麼？',
  'about.ctaLead': '項目頁裡有全部正在開發和維護的項目。',
  'about.browse': '瀏覽項目',
  'about.contact': '聯繫我們',
  'about.focusKicker': '// focus',

  /* 聯繫頁 */
  'contact.emailLabel': '郵箱地址',
  'contact.copy': '複製',
  'contact.copied': '已複製',
  'contact.ready': '準備好了嗎？',
  'contact.ctaLead': '前往 GitHub 組織，挑一個你感興趣的項目開始吧。',
  'contact.openGithub': '打開 GitHub 組織',
  'contact.joinKicker': '// join',

  /* 項目列表頁 */
  'projects.title': '核心項目',
  'projects.lead': '{name} 正在開發與維護的開源項目，覆蓋跨平台桌面、服務端、文檔框架與作業系統等方向。',
  'projects.all': '全部',
  'projects.other': '其他',
  'projects.count': '{n} 個項目',
  'projects.empty': '這個分類下暫時沒有項目。',
  'projects.tailTitle': '有想法，或發現問題？',
  'projects.tailLead': '在對應倉庫提 Issue 是參與進來最快的方式。',
  'projects.openGithub': '前往 GitHub 組織',
  'projects.kicker': '// projects',

  /* 項目詳情頁 */
  'detail.home': '首頁',
  'detail.projects': '項目',
  'detail.backList': '返回列表',
  'detail.aboutTitle': '項目簡介',
  'detail.highlights': '能力亮點',
  'detail.status': '狀態',
  'detail.stack': '技術棧',
  'detail.githubData': 'GitHub 數據',
  'detail.language': '語言',
  'detail.star': 'Star',
  'detail.fork': 'Fork',
  'detail.issues': 'Issues',
  'detail.size': '體積',
  'detail.license': '許可證',
  'detail.updated': '最近更新',
  'detail.links': '相關連結',
  'detail.prev': '上一個',
  'detail.next': '下一個',
  'detail.missingTitle': '找不到這個項目',
  'detail.missingLead': 'slug「{slug}」不在項目列表中。',
  'detail.browseAll': '瀏覽全部項目',

  /* 404 */
  'nf.text': '你要找的頁面不存在，或者已經被移動到別處了。',
  'nf.home': '回到首頁',
  'nf.projects': '看看項目',

  /* 組件 */
  'card.viewDetails': '查看詳情',
  'card.updated': '更新於',
  'backToTop': '回到頂部',
}
