import { isCN } from './isCN'

describe('isCN 方法测试', () => {
    test('是中文', () => {
        expect(isCN('今天天气真好')).toBeTruthy()
    })
    test('不是中文', () => {
        expect(isCN('emm')).toBeFalsy()
    })
    test('符号', () => {
        expect(isCN('.')).toBeFalsy()
    })
})
