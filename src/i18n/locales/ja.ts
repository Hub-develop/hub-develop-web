/* ============================================================
 * Hub-develop · 界面文案（日本語）
 * ------------------------------------------------------------
 * 仅放按钮、标签、章节标题、占位等「界面壳」文字；
 * 页面正文 / 配置文案走 src/content/site.ts 的多语言配置。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                       → 当前语言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })  → 支持 {name} 占位替换
 * 未知 key 直接返回 key 本身（不会报错）。
 * ============================================================ */

export const ja: Record<string, string> = {
  /* 导航 / 通用 */
  'nav.menu': 'メニュー',
  'nav.github': 'GitHub',

  /* 首页 */
  'home.featuredTitle': '注目プロジェクト',
  'home.featuredLead': '私たちが積極的に開発・保守しているプロジェクトの一部です。',
  'home.allProjects': 'すべてのプロジェクト',
  'home.stackTitle': '技術スタックとタグ',
  'home.stackLead':
    '公開リポジトリ {n} 件の言語分布からリアルタイムに集計。{m} の技術スタック、{k} の組織タグを網羅。',
  'home.repoUnit': 'リポジトリ',
  'home.orgTags': '組織タグ',
  'home.aboutTitle': '{name} について',
  'home.learnMore': '詳しく見る',
  'home.ctaTitle': '一緒に何か作りませんか？',
  'home.ctaLead': 'バグ報告、技術談義、共同開発——どんなきっかけでも歓迎します。',
  'home.contactUs': 'お問い合わせ',
  'home.followGithub': 'GitHub でフォロー',

  /* 关于页 */
  'about.focusTitle': '注力分野',
  'about.focusLead': '私たちは 4 つの方向に注力し、それぞれを支えるプロジェクトがあります。',
  'about.principlesTitle': '私たちの原則',
  'about.principlesKicker': '// principles',
  'about.ctaTitle': '何を作ったか見てみますか？',
  'about.ctaLead': 'プロジェクトページに、開発・保守中のすべてのプロジェクトがあります。',
  'about.browse': 'プロジェクトを見る',
  'about.contact': 'お問い合わせ',
  'about.focusKicker': '// focus',

  /* 联系页 */
  'contact.emailLabel': 'メールアドレス',
  'contact.copy': 'コピー',
  'contact.copied': 'コピーしました',
  'contact.ready': '始める準備はできましたか？',
  'contact.ctaLead': 'GitHub の組織へ行き、興味のあるプロジェクトを選びましょう。',
  'contact.openGithub': 'GitHub 組織を開く',
  'contact.joinKicker': '// join',

  /* 项目列表页 */
  'projects.title': 'コアプロジェクト',
  'projects.lead':
    '{name} が開発・保守するオープンソースプロジェクト。クロスプラットフォームのデスクトップ、サーバー、ドキュメントフレームワーク、OS などを網羅。',
  'projects.all': 'すべて',
  'projects.other': 'その他',
  'projects.count': 'プロジェクト {n} 件',
  'projects.empty': 'このカテゴリにはまだプロジェクトがありません。',
  'projects.tailTitle': 'アイデアや不具合がありましたら？',
  'projects.tailLead': '該当リポジトリで Issue を開くのが、参加する一番早い方法です。',
  'projects.openGithub': 'GitHub 組織へ',
  'projects.kicker': '// projects',

  /* 项目详情页 */
  'detail.home': 'ホーム',
  'detail.projects': 'プロジェクト',
  'detail.backList': '一覧へ戻る',
  'detail.aboutTitle': '概要',
  'detail.highlights': 'ハイライト',
  'detail.status': 'ステータス',
  'detail.stack': 'スタック',
  'detail.githubData': 'GitHub データ',
  'detail.language': '言語',
  'detail.star': 'Star',
  'detail.fork': 'Fork',
  'detail.issues': 'Issues',
  'detail.size': 'サイズ',
  'detail.license': 'ライセンス',
  'detail.updated': '最終更新',
  'detail.links': 'リンク',
  'detail.prev': '前へ',
  'detail.next': '次へ',
  'detail.missingTitle': 'プロジェクトが見つかりません',
  'detail.missingLead': 'slug「{slug}」はプロジェクト一覧にありません。',
  'detail.browseAll': 'すべてのプロジェクトを見る',

  /* 404 */
  'nf.text': 'お探しのページは存在しないか、別の場所へ移動しました。',
  'nf.home': 'ホームへ戻る',
  'nf.projects': 'プロジェクトを見る',

  /* 组件 */
  'card.viewDetails': '詳細を見る',
  'card.updated': '更新',
  'backToTop': 'トップへ戻る',
}
