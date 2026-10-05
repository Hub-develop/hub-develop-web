/* ============================================================
 * Hub-develop · i18n 运行时（界面文案）
 * ------------------------------------------------------------
 * 文案拆分到独立的 locale 文件（src/i18n/locales/zh.ts、en.ts），
 * 本文件只负责按当前 locale 取词。页面正文 / 配置文案走
 * src/content/site.ts 的双语配置（同样是随 locale 派生的 computed）。
 *
 * 用法：import { t } from '@/i18n/ui'
 *   t('home.featuredTitle')                        → 取当前语言的文案
 *   t('home.aboutTitle', { name: 'Hub-develop' })   → 支持 {name} 占位替换
 * 未知 key 直接返回 key 本身（不会报错）。
 * ============================================================ */

import { locale } from './index'
import type { Locale } from './index'
import { zh } from './locales/zh'
import { en } from './locales/en'

const tables: Record<Locale, Record<string, string>> = { zh, en }

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
