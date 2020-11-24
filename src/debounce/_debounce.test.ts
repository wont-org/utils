import { debounce } from './debounce'

jest.useFakeTimers()

describe('debounce 方法测试', () => {
    test('debounce second arguments use default value 300ms', () => {
        const mockFn = jest.fn()
        const debounced = debounce(mockFn)
        debounced()
        jest.advanceTimersByTime(300)
        expect(mockFn).toHaveBeenCalledTimes(1)
        // clear timeout
        debounced()
    })
    test('>=300ms can be called', () => {
        const mockFn = jest.fn()
        const debounced = debounce(mockFn, 300)
        debounced()
        expect(mockFn).not.toBeCalled()
        jest.advanceTimersByTime(299)
        expect(mockFn).not.toBeCalled()
        jest.advanceTimersByTime(1)
        expect(mockFn).toHaveBeenCalledTimes(1)
        // clear timeout
        debounced()
    })
    test('function arguments can be correct called', () => {
        const mockFn = jest.fn()
        const debounced = debounce(mockFn, 300)
        debounced(300, 'payload')
        jest.advanceTimersByTime(300)
        expect(mockFn).toHaveBeenCalledWith(300, 'payload')
        // clear timeout
        debounced()
    })
})
