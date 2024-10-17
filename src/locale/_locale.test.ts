import {
  locale, LocaleSourceData,
} from './locale'

describe('locale', () => {
  describe('getLocaleData', () => {
    it('should return localized data for a given language', () => {
      const data: LocaleSourceData = {
        'Pagination.total': {
          enUS: 'Total',
          zhCN: '总计',
        },
        'Button.submit': {
          enUS: 'Submit',
          zhCN: '提交',
        },
      }

      const result = locale.getLocaleData(data, 'enUS')
      expect(result).toEqual({
        'Pagination.total': 'Total',
        'Button.submit': 'Submit',
      })

      const resultCN = locale.getLocaleData(data, 'zhCN')
      expect(resultCN).toEqual({
        'Pagination.total': '总计',
        'Button.submit': '提交',
      })
    })

    it('should return an empty object if data is empty', () => {
      const data: LocaleSourceData = {}
      const result = locale.getLocaleData(data, 'enUS')
      expect(result).toEqual({})
    })
  })

  describe('formatLocaleData', () => {
    it('should add id to each entry in the localized data', () => {
      const data: LocaleSourceData = {
        'Pagination.total': {
          enUS: 'Total',
          zhCN: '总计',
        },
        'Button.submit': {
          enUS: 'Submit',
          zhCN: '提交',
        },
      }

      const result = locale.formatLocaleData(data)
      expect(result).toEqual({
        'Pagination.total': {
          enUS: 'Total',
          zhCN: '总计',
          id: 'Pagination.total',
        },
        'Button.submit': {
          enUS: 'Submit',
          zhCN: '提交',
          id: 'Button.submit',
        },
      })
    })

    it('should return an empty object if data is empty', () => {
      const data: LocaleSourceData = {}
      const result = locale.formatLocaleData(data)
      expect(result).toEqual({})
    })
  })
})
