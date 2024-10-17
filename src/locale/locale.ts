/**
 * 可用的语言类型。
 */
export type LangType = 'enUS' | 'zhCN'

/**
 * 表示特定语言的国际化源对象。
 */
export type LocaleSourceObj = {
  [key in LangType]: string
}

/**
 * 表示包含多个国际化源对象的数据。
 */
export type LocaleSourceData = Record<string, LocaleSourceObj>

/**
 * 表示经过格式化处理的国际化数据。
 * 为每个键添加一个 `id` 字段。
 */
export type LocaleFormatData<T> = {
  [P in keyof T]: T[P] & { id: string }
}

/**
 * 获取特定语言的国际化数据。
 *
 * @template T 国际化源数据的类型。
 * @param {object} data 包含多个国际化源对象的数据。
 * @param {string} lang 要获取的语言类型。
 * @returns {object} 一个对象，其中包含指定语言的国际化数据。
 */
const getLocaleData = <T extends LocaleSourceData>(
  data: T,
  lang: LangType,
): Record<string, string> => Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value[lang]]),
  )

/**
 * 格式化国际化数据，为每个键添加一个 `id` 字段。
 *
 * @template T 国际化源数据的类型。
 * @param {object} data 包含多个国际化源对象的数据。
 * @returns {object} 一个对象，其中每个国际化源对象都带有一个 `id` 字段。
 */
const formatLocaleData = <T extends LocaleSourceData>(
  data: T,
): Record<string, LocaleSourceObj & { id: string }> => Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, { ...value, id: key }]),
  )

/**
 * 国际化数据处理模块。
 * @author liukun <919590347@qq.com>
 * @example
 * import { locale } from '@wont/utils'
 *
 * const data = {
 *  'Pagination.total': {
 *    enUS: 'Total',
 *    zhCN: '总计',
 *  }
 * }
 * const formatedData = {
 *  'Pagination.total': {
 *    enUS: 'Total',
 *    zhCN: '总计',
 *    id: 'Pagination.total',
 *  }
 * }
 * const formatedZhCNData = {
 *  'Pagination.total': '总计'
 * }
 * locale.formatLocaleData(data)  // returns formatedData
 * locale.getLocaleData(data, 'zhCN')  // returns formatedZhCNData
 */
export const locale = {
  getLocaleData,
  formatLocaleData,
}
