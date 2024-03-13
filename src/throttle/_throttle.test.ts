import sinon from 'sinon'
import { throttle } from './throttle'

describe('throttle 方法测试', () => {
  let clock
  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })
  afterEach(() => {
    clock.restore()
  })
  test('<=300ms called 3 times, but only first one success', () => {
    const mockFn = jest.fn()
    const throttled = throttle(mockFn)
    for (let i = 0; i < 3; i += 1) {
      clock.tick(100)
      throttled(i)
    }
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn.mock.calls[0][0]).toBe(0)
  })
})
