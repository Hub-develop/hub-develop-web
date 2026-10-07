/* ============================================================
 * Hub-develop · i18n 运行时（零依赖，N 语言可扩展）
 * ------------------------------------------------------------
 * - locale 是响应式开关，取值来自 LOCALES 注册表
 * - 新增语言 = 在 LOCALES 加一项 + 在 src/i18n/locales/ 加一个文件，
 *   无需改动任何消费方（site / projects / 组件都按 locale 派生）
 * - 默认跟随浏览器语言，选择记入 localStorage（设备级记忆）
 * - 切换时同步设置 <html lang>
 * ============================================================ */

import { ref } from 'vue'

export const LOCALES = [
  { code: 'zh', native: '中文', htmlLang: 'zh-CN' },
  { code: 'zht', native: '繁體中文', htmlLang: 'zh-Hant' },
  { code: 'en', native: 'English', htmlLang: 'en' },
  { code: 'ja', native: '日本語', htmlLang: 'ja' },
  { code: 'ko', native: '한국어', htmlLang: 'ko' },
] as const

/** 由 LOCALES 推导出的语言代码联合类型：'zh' | 'zht' | 'en' | 'ja' | 'ko' */
export type Locale = (typeof LOCALES)[number]['code']

/** 所有受支持的语言代码 */
export const LOCALE_CODES = LOCALES.map((l) => l.code) as Locale[]

/** 缺译 / 未知语言时的兜底语言（UI 文案 + 正文内容都回退到这里） */
export const DEFAULT_LOCALE: Locale = 'en'

const STORAGE_KEY = 'hub-develop-locale'

function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && (LOCALE_CODES as string[]).includes(saved)) return saved as Locale
  const nav = window.navigator.language?.toLowerCase() ?? ''
  // 繁体中文地区：zh-Hant / zh-TW / zh-HK / zh-MO 等（早于通用 zh 判定）
  if (/hant|tw|hk|mo/.test(nav)) return 'zht'
  for (const l of LOCALES) {
    if (nav.startsWith(l.code)) return l.code
  }
  return DEFAULT_LOCALE
}

export const locale = ref<Locale>(detectLocale())

function applyHtmlLang(l: Locale) {
  if (typeof document !== 'undefined') {
    const entry = LOCALES.find((x) => x.code === l)
    document.documentElement.lang = entry?.htmlLang ?? l
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
