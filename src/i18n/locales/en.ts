/* ============================================================
 * Hub-develop · UI strings (English)
 * ------------------------------------------------------------
 * Only the "interface chrome" text lives here — buttons, labels,
 * section titles, placeholders. Page body / config copy lives in
 * src/content/site.ts as a bilingual config.
 *
 * Usage: import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                       → current-locale string
 *   t('home.aboutTitle', { name: 'Hub-develop' }) → {name} interpolation
 * Unknown keys return the key itself (never throws).
 * ============================================================ */

export const en: Record<string, string> = {
  /* nav / common */
  'nav.menu': 'Toggle menu',
  'nav.github': 'GitHub',

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
