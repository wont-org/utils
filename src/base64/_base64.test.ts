import {
  decode as decodeAll, isValid, encode, encodeURI,
} from 'js-base64'
import { base64 } from './base64'

jest.mock('js-base64', () => ({
  ...(jest.requireActual('js-base64') as Record<string, any>),
  decode: jest.fn(),
  isValid: jest.fn(),
  encode: jest.fn(),
  encodeURI: jest.fn(),
}))
describe('base64 utility functions', () => {
  describe('decode function', () => {
    it('returns empty string for non-string input', () => {
      expect(base64.decode(null as any)).toBe('')
      expect(base64.decode(123 as any)).toBe('')
    })

    it('returns original string for invalid Base64 string', () => {
      ;(isValid as jest.Mock).mockReturnValue(false)
      const str = 'invalidBase64'
      expect(base64.decode(str)).toBe(str)
      expect(isValid).toHaveBeenCalledWith(str)
    })

    it('returns decoded string for valid Base64 string', () => {
      const decodedStr = 'decodedString';
      (isValid as jest.Mock).mockReturnValue(true);
      (decodeAll as jest.Mock).mockReturnValue(decodedStr)
      const str = 'ZGVjb2RlZFN0cmluZw=='
      expect(base64.decode(str)).toBe(decodedStr)
      expect(isValid).toHaveBeenCalledWith(str)
      expect(decodeAll).toHaveBeenCalledWith(str)
    })

    it('returns original string if decoded result has invalid encoding', () => {
      const decodedStr = 'invalid�String';
      (isValid as jest.Mock).mockReturnValue(true);
      (decodeAll as jest.Mock).mockReturnValue(decodedStr)
      const str = 'aW52YWxpZCTwn5iOSW5z'
      expect(base64.decode(str)).toBe(str)
      expect(isValid).toHaveBeenCalledWith(str)
      expect(decodeAll).toHaveBeenCalledWith(str)
    })

    it('returns original string if decodeAll throws an error', () => {
      ;(isValid as jest.Mock).mockReturnValue(true);
      (decodeAll as jest.Mock).mockImplementation(() => {
        throw new Error('Decoding error')
      })
      const str = 'ZGVjb2RlZFN0cmluZw=='
      expect(base64.decode(str)).toBe(str)
      expect(isValid).toHaveBeenCalledWith(str)
      expect(decodeAll).toHaveBeenCalledWith(str)
    })
  })

  describe('encode and encodeURI functions', () => {
    it('encodes a string to Base64', () => {
      const input = 'ip.port="443"'
      const encodedStr = 'aXAucG9ydD0iNDQzIg==';
      (encode as jest.Mock).mockReturnValue(encodedStr)

      expect(base64.encode(input)).toBe(encodedStr)
      expect(encode).toHaveBeenCalledWith(input)
    })

    it('encodes a string to URL-safe Base64', () => {
      const input = 'country=="中国"'
      const encodedURIStr = 'Y291bnRyeT09IuS4reWbvSI=';
      (encodeURI as jest.Mock).mockReturnValue(encodedURIStr)

      expect(base64.encodeURI(input)).toBe(encodedURIStr)
      expect(encodeURI).toHaveBeenCalledWith(input)
    })

    it('decodes a URL-safe Base64 encoded string', () => {
      const input = 'Y291bnRyeT09IuS4reWbvSI='
      const decodedStr = 'country=="中国"';
      (isValid as jest.Mock).mockReturnValue(true);
      (decodeAll as jest.Mock).mockReturnValue(decodedStr)

      expect(base64.decode(input)).toBe(decodedStr)
      expect(isValid).toHaveBeenCalledWith(input)
      expect(decodeAll).toHaveBeenCalledWith(input)
    })
  })

  describe('URL encoding and decoding integration tests', () => {
    it('correctly encodes and decodes URL-safe Base64 strings', async () => {
      const base64Actual = jest.requireActual('js-base64')

      const query = '(ip.port="443") && country=="中国"'
      const encodedQuery = base64Actual.encodeURI(query)
      const decodedQuery = base64Actual.decode(encodedQuery)

      expect(encodedQuery).toBe(
        'KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i',
      )
      expect(decodedQuery).toBe(query)
    })

    it('correctly encodes and decodes URL-safe Base64 strings and simulates URL jump', () => {
      const base64Actual = jest.requireActual('js-base64')
      const query = '(ip.port="443") && country=="中国"'
      const encodedQuery = base64Actual.encodeURI(query)

      const url = `https://example.com/?data=${encodedQuery}`
      const expectedUrl = 'https://example.com/?data=KGlwLnBvcnQ9IjQ0MyIpICYmIGNvdW50cnk9PSLkuK3lm70i'

      expect(url).toBe(expectedUrl)
      // Simulate URL jump and decoding from URL
      const urlParams = new URLSearchParams(`data=${encodedQuery}`)
      const decodedQuery = base64Actual.decode(urlParams.get('data') || '')

      expect(decodedQuery).toBe(query)
    })
  })

  describe('hasInvalidEncoding function', () => {
    it('detects invalid encoding character', () => {
      expect(base64.hasInvalidEncoding('invalid�String')).toBe(true)
      expect(base64.hasInvalidEncoding('validString')).toBe(false)
    })
  })
})
