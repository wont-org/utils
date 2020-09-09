import { validator } from './validator'

describe('isAddress 方法测试', () => {
    test('符合地址', () => {
        expect(validator('address', '1111号楼')).toBeTruthy()
    })
    test('不符合地址', () => {
        expect(validator('address', '西安')).toBeFalsy()
    })
})

describe('isBank 方法测试', () => {
    test('符合银行卡号', () => {
        expect(validator('bank', '4026589624604900')).toBeTruthy()
    })
    test('不符合银行卡号', () => {
        expect(validator('bank', '0026589624604900')).toBeFalsy()
    })
})

describe('isCN 方法测试', () => {
    test('是中文', () => {
        expect(validator('CN', '今天天气真好')).toBeTruthy()
    })
    test('不是中文', () => {
        expect(validator('CN', 'emm')).toBeFalsy()
    })
    test('符号', () => {
        expect(validator('CN', '.')).toBeFalsy()
    })
})

describe('isCName 方法测试', () => {
    test('符合中文名', () => {
        expect(validator('CName', '马哥')).toBeTruthy()
    })
    test('不符合中文名', () => {
        expect(validator('CName', '马哥·')).toBeFalsy()
    })
})

describe('isEmail 方法测试', () => {
    test('符合邮箱', () => {
        expect(validator('email', '919590347@qq.com')).toBeTruthy()
    })
    test('不符合邮箱', () => {
        expect(validator('email', '919590347@qq')).toBeFalsy()
    })
})

describe('isIdCard 方法测试', () => {
    test('不符合身份证，小于18位', () => {
        expect(validator('idCard', '6125')).toBeFalsy()
    })
    test('不符合身份证，大于18位', () => {
        expect(validator('idCard', '6125251996060691351')).toBeFalsy()
    })
    test('不符合身份证，等于18位', () => {
        expect(validator('idCard', '6666661996060691351')).toBeFalsy()
    })
    test('符合身份证,，不带x', () => {
        expect(validator('idCard', '612525199606069135')).toBeTruthy()
    })
    test('符合身份证，带x', () => {
        expect(validator('idCard', '61252519960606545x')).toBeTruthy()
    })
})

describe('isMobile 方法测试', () => {
    test('13233333333 isMobile toBeTruthy', () => {
        expect(validator('mobile', '13233333333')).toBeTruthy()
    })
    test('12233333333 isMobile toBeFalsy', () => {
        expect(validator('mobile', '12233333333')).toBeFalsy()
    })
})

describe('isNumber 方法测试', () => {
    test(" '1' isNumber toBeTruthy ", () => {
        expect(validator('number', '1')).toBeTruthy()
    })
    test(" '' isNumber toBeFalsy ", () => {
        expect(validator('number', '')).toBeFalsy()
    })
})
