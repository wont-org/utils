import sinon from 'sinon'
import { debounce } from './debounce'

describe('debounce 方法测试', () => {
    let clock
    beforeEach(() => {
        clock = sinon.useFakeTimers()
    })
    afterEach(() => {
        clock.restore()
    })
    test('<=300ms called 3 times, but only last one success', () => {
        const mockFn = jest.fn()
        const debounced = debounce(mockFn)
        debounced()
        expect(mockFn).toHaveBeenCalledTimes(0)
        for (let i = 0; i < 3; i += 1) {
            clock.tick(100)
            debounced(i)
        }
        clock.tick(300)
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(mockFn.mock.calls[0][0]).toBe(2)
    })
    test('immediate called', () => {
        const mockFn = jest.fn()
        const debounced = debounce(mockFn, 300, true)
        debounced()
        expect(mockFn).toHaveBeenCalledTimes(1)
        clock.tick(300)
        debounced()
        expect(mockFn).toHaveBeenCalledTimes(2)
    })
})
