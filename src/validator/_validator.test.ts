import { validator } from './validator'

describe('mobile 规则测试', () => {
    test('符合手机号', () => {
        expect(validator('mobile', '13233333333')).toBeTruthy()
    })
    test('不符合手机号', () => {
        expect(validator('mobile', '12233333333')).toBeFalsy()
    })
})

describe('tel 规则测试', () => {
    test('符合座机号', () => {
        expect(validator('tel', '0341-86091234')).toBeTruthy()
    })
    test('不符合座机号', () => {
        expect(validator('tel', '012-1111')).toBeFalsy()
    })
})

describe('email 规则测试', () => {
    test('符合邮箱', () => {
        expect(validator('email', '919590347@qq.com')).toBeTruthy()
    })
    test('不符合邮箱', () => {
        expect(validator('email', '919590347@qq')).toBeFalsy()
    })
})

describe('bank 规则测试', () => {
    test('符合银行卡号', () => {
        expect(validator('bank', '4026589624604900')).toBeTruthy()
    })
    test('不符合银行卡号', () => {
        expect(validator('bank', '0026589624604900')).toBeFalsy()
    })
})

describe('CN 规则测试', () => {
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

describe('CName 规则测试', () => {
    test('符合中文名', () => {
        expect(validator('CName', '马哥')).toBeTruthy()
    })
    test('不符合中文名', () => {
        expect(validator('CName', '马哥·')).toBeFalsy()
    })
})

describe('idCard 规则测试', () => {
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

describe('number 规则测试', () => {
    test('符合数字', () => {
        expect(validator('number', '1')).toBeTruthy()
    })
    test('不符合数字', () => {
        expect(validator('number', '')).toBeFalsy()
    })
})

describe('url 规则测试', () => {
    test('符合url', () => {
        expect(
            validator(
                'url',
                'http://www.baidu.com/#/index?type=hash&id=8080&index=0',
            ),
        ).toBeTruthy()
    })
    test('不符合url', () => {
        expect(
            validator(
                'url',
                'http://localhost:8088/#/index?type=hash&id=8080&index=0',
            ),
        ).toBeFalsy()
    })
})
