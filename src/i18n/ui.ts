/* ============================================================
 * Hub-develop · i18n 运行时（界面文案取词）
 * ------------------------------------------------------------
 * 文案拆分到独立的 locale 文件（src/i18n/locales/{zh,en,ja,ko}.ts），
 * 本文件只负责按当前 locale 取词，未知语言回退到 DEFAULT_LOCALE。
 * 页面正文 / 配置文案走 src/content/site.ts 的多语言配置。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                        → 取当前语言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })   → 支持 {name} 占位替换
 * 未知 key 直接返回 key 本身（不会报错）。
 * ============================================================ */

import { locale, DEFAULT_LOCALE } from './index'
import { uiTables } from './locales'

export function t(key: string, params?: Record<string, string | number>): string {
  const table = uiTables[locale.value] ?? uiTables[DEFAULT_LOCALE]
  let str = table[key] ?? uiTables[DEFAULT_LOCALE][key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return str
}
