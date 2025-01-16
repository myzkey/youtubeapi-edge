import { describe, it, expect } from 'vitest'
import { SearchRequestAdapter } from './index'
import { InputSearchRequest } from '~/input-types/input-search-request'

describe('SearchRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputSearchRequest
    expect(() => new SearchRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = { part: ['snippet'], maxResults: -1 } as InputSearchRequest
    expect(() => new SearchRequestAdapter(params)).toThrowError(
      'maxResults must be between 0 and 50.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputSearchRequest
    const adapter = new SearchRequestAdapter(params)
    expect(adapter).toBeInstanceOf(SearchRequestAdapter)
  })

  it('should convert InputSearchRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputSearchRequest
    const adapter = new SearchRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
