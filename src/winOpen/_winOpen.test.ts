import {
  IWinOpenParams, winOpen,
} from './winOpen'

describe('winOpen 方法测试', () => {
  test('opens a new window with the correct URL and attributes', () => {
    const openSpy = jest.spyOn(window, 'open').mockReturnValue(null)

    const params: IWinOpenParams = {
      path: 'https://example.com',
      query: { key: 'value' },
      target: '_blank',
    }

    winOpen(params)

    const expectedUrl = 'https://example.com?key=value'
    expect(window.open).toHaveBeenCalledWith(
      expectedUrl,
      '_blank',
      'noopener noreferrer',
    )
    expect(openSpy).toHaveBeenCalledTimes(1)

    openSpy.mockRestore()
  })

  test('opens a new window with default target and no query params', () => {
    const openSpy = jest.spyOn(window, 'open').mockReturnValue(null)

    const params: IWinOpenParams = {
      path: 'https://example.com',
    }

    winOpen(params)

    expect(window.open).toHaveBeenCalledWith(
      'https://example.com',
      '_blank',
      'noopener noreferrer',
    )
    expect(openSpy).toHaveBeenCalledTimes(1)

    openSpy.mockRestore()
  })

  test('sets opener to null if new window is opened', () => {
    const newWindowMock: any = { opener: 'someOpener' }
    const openSpy = jest.spyOn(window, 'open').mockReturnValue(newWindowMock)

    winOpen({ path: 'https://example.com' })

    expect(newWindowMock.opener).toBeNull()
    expect(openSpy).toHaveBeenCalledTimes(1)

    openSpy.mockRestore()
  })
})
