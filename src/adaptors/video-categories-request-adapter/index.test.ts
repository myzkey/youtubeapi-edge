import { describe, it, expect } from 'vitest'
import { VideoCategoriesRequestAdapter } from './index'
import { InputVideoCategoriesRequest } from '~/input-types'

describe('VideoCategoriesRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputVideoCategoriesRequest
    expect(() => new VideoCategoriesRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputVideoCategoriesRequest
    const adapter = new VideoCategoriesRequestAdapter(params)
    expect(adapter).toBeInstanceOf(VideoCategoriesRequestAdapter)
  })

  it('should convert InputVideoCategoriesRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputVideoCategoriesRequest
    const adapter = new VideoCategoriesRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
