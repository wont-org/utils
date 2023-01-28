import { arrayToObject } from './arrayToObject'

describe('arrayToObject 方法测试', () => {
    test('execute param fieldNames use default', () => {
        expect(arrayToObject(
            [
                {
                    value: 'a',
                    label: 1,
                },
                {
                    value: 'b',
                    label: 2,
                },
            ],
        )).toStrictEqual({ a: 1, b: 2 })
    })
    test('execute param fieldNames use custom', () => {
        expect(arrayToObject(
            [
                {
                    key: 'a',
                    value: 1,
                },
                {
                    key: 'b',
                    value: 2,
                },
            ],
            {
                key: 'key',
                value: 'value',
            },
        )).toStrictEqual({ a: 1, b: 2 })
    })
})
