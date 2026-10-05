/* ============================================================
 * Hub-develop · UI 文案聚合
 * ------------------------------------------------------------
 * 把所有语言的界面文案字典汇总到一个表里，供 ui.ts 的 t() 取词。
 * 新增语言：在这里 import 对应文件并加入 uiTables 即可。
 * ============================================================ */

import { zh } from './zh'
import { en } from './en'
import { ja } from './ja'
import { ko } from './ko'

export const uiTables: Record<string, Record<string, string>> = {
  zh,
  en,
  ja,
  ko,
}
