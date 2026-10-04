/* ============================================================
 * Hub-develop · i18n 运行时（零依赖）
 * ------------------------------------------------------------
 * - locale 是响应式开关（'zh' | 'en'）
 * - 默认跟随浏览器语言，选择记入 localStorage
 * - 切换时同步设置 <html lang>
 * ============================================================ */

import { ref } from 'vue'

export type Locale = 'zh' | 'en'

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: 'zh', label: '中文', short: '中' },
  { code: 'en', label: 'English', short: 'EN' },
]

const STORAGE_KEY = 'hub-develop-locale'

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'zh'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh' || saved === 'en') return saved
  const nav = window.navigator.language?.toLowerCase() ?? 'zh'
  return nav.startsWith('zh') ? 'zh' : 'en'
}

export const locale = ref<Locale>(detectLocale())

function applyHtmlLang(l: Locale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
  }
}

applyHtmlLang(locale.value)

export function setLocale(next: Locale) {
  locale.value = next
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, next)
  }
  applyHtmlLang(next)
}

export function otherLocale(): Locale {
  return locale.value === 'zh' ? 'en' : 'zh'
}
