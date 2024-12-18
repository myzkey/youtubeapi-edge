import { describe, it, expect } from 'vitest'
import { appendParamsToUrl } from './url'

describe('appendParamsToUrl', () => {
  it('should append params and apiKey to the URL', () => {
    const baseUrl = 'https://example.com/api'
    const params = {
      q: 'search',
      page: 1,
      active: true,
    }
    const apiKey = 'test-api-key'

    const result = appendParamsToUrl(baseUrl, params, apiKey)

    const expectedUrl =
      'https://example.com/api?q=search&page=1&active=true&key=test-api-key'

    expect(result.toString()).toBe(expectedUrl)
  })

  it('should handle an empty params object and append only the apiKey', () => {
    const baseUrl = 'https://example.com/api'
    const params = {}
    const apiKey = 'test-api-key'

    const result = appendParamsToUrl(baseUrl, params, apiKey)
    const expectedUrl = 'https://example.com/api?key=test-api-key'

    expect(result.toString()).toBe(expectedUrl)
  })

  it('should correctly handle special characters in params', () => {
    const baseUrl = 'https://example.com/api'
    const params = {
      q: 'hello world!',
      filter: 'name=John&Doe',
    }
    const apiKey = 'test-api-key'

    const result = appendParamsToUrl(baseUrl, params, apiKey)
    const expectedUrl =
      'https://example.com/api?q=hello+world%21&filter=name%3DJohn%26Doe&key=test-api-key'

    expect(result.toString()).toBe(expectedUrl)
  })
})
