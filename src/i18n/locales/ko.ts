/* ============================================================
 * Hub-develop · UI strings (한국어)
 * ------------------------------------------------------------
 * Only the "interface chrome" text lives here — buttons, labels,
 * section titles, placeholders. Page body / config copy lives in
 * src/content/site.ts as a multilingual config.
 *
 * Usage: import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                      → current-locale string
 *   t('home.aboutTitle', { name: 'Hub-develop' }) → {name} interpolation
 * Unknown keys return the key itself (never throws).
 * ============================================================ */

export const ko: Record<string, string> = {
  /* nav / common */
  'nav.menu': '메뉴',
  'nav.github': 'GitHub',

  /* home */
  'home.featuredTitle': '주요 프로젝트',
  'home.featuredLead': '우리가 적극적으로 개발하고 유지하는 프로젝트 중 일부입니다.',
  'home.allProjects': '모든 프로젝트',
  'home.stackTitle': '기술 스택과 태그',
  'home.stackLead':
    '공개 저장소 {n}개의 언어 분포를 실시간으로 집계했으며, {m}개의 기술 스택과 {k}개의 조직 태그를 포괄합니다.',
  'home.repoUnit': '저장소',
  'home.orgTags': '조직 태그',
  'home.aboutTitle': '{name} 소개',
  'home.learnMore': '자세히 보기',
  'home.ctaTitle': '함께 무언가 만들어 볼까요?',
  'home.ctaLead': '버그 제보, 기술 이야기, 협업 어느 것이든 환영합니다.',
  'home.contactUs': '문의하기',
  'home.followGithub': 'GitHub에서 팔로우',

  /* about */
  'about.focusTitle': '중점 분야',
  'about.focusLead': '우리는 네 가지 방향에 집중하며, 각 분야를 뒷받침하는 프로젝트가 있습니다.',
  'about.principlesTitle': '우리의 원칙',
  'about.principlesKicker': '// principles',
  'about.ctaTitle': '무엇을 만들었는지 볼까요?',
  'about.ctaLead': '프로젝트 페이지에서 개발·유지 중인 모든 프로젝트를 확인할 수 있습니다.',
  'about.browse': '프로젝트 보기',
  'about.contact': '문의하기',
  'about.focusKicker': '// focus',

  /* contact */
  'contact.emailLabel': '이메일 주소',
  'contact.copy': '복사',
  'contact.copied': '복사됨',
  'contact.ready': '준비되셨나요?',
  'contact.ctaLead': 'GitHub 조직으로 이동해 관심 있는 프로젝트를 골라 보세요.',
  'contact.openGithub': 'GitHub 조직 열기',
  'contact.joinKicker': '// join',

  /* projects list */
  'projects.title': '핵심 프로젝트',
  'projects.lead':
    '{name}가 개발하고 유지하는 오픈소스 프로젝트. 크로스 플랫폼 데스크톱, 서버, 문서 프레임워크, 운영체제 등을 아우릅니다.',
  'projects.all': '전체',
  'projects.other': '기타',
  'projects.count': '프로젝트 {n}개',
  'projects.empty': '이 분류에는 아직 프로젝트가 없습니다.',
  'projects.tailTitle': '아이디어나 버그를 발견하셨나요?',
  'projects.tailLead': '해당 저장소에 Issue를 남기는 것이 참여하는 가장 빠른 방법입니다.',
  'projects.openGithub': 'GitHub 조직으로',
  'projects.kicker': '// projects',

  /* project detail */
  'detail.home': '홈',
  'detail.projects': '프로젝트',
  'detail.backList': '목록으로 돌아가기',
  'detail.aboutTitle': '개요',
  'detail.highlights': '주요 기능',
  'detail.status': '상태',
  'detail.stack': '스택',
  'detail.githubData': 'GitHub 데이터',
  'detail.language': '언어',
  'detail.star': 'Star',
  'detail.fork': 'Fork',
  'detail.issues': 'Issues',
  'detail.size': '크기',
  'detail.license': '라이선스',
  'detail.updated': '마지막 업데이트',
  'detail.links': '관련 링크',
  'detail.prev': '이전',
  'detail.next': '다음',
  'detail.missingTitle': '프로젝트를 찾을 수 없습니다',
  'detail.missingLead': 'slug 「{slug}」는 프로젝트 목록에 없습니다.',
  'detail.browseAll': '모든 프로젝트 보기',

  /* 404 */
  'nf.text': '찾으시는 페이지가 없거나 다른 곳으로 옮겨졌습니다.',
  'nf.home': '홈으로 돌아가기',
  'nf.projects': '프로젝트 보기',

  /* components */
  'card.viewDetails': '자세히 보기',
  'card.updated': '업데이트',
  'backToTop': '맨 위로',
}
