import { describe, it, expect } from 'vitest'
import { VideosRequestAdapter } from './index'
import { InputVideosRequest } from '~/input-types/input-videos-request'

describe('VideosRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputVideosRequest
    expect(() => new VideosRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = { part: ['snippet'], maxResults: -1 } as InputVideosRequest
    expect(() => new VideosRequestAdapter(params)).toThrowError(
      'maxResults must be between 0 and 50.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputVideosRequest
    const adapter = new VideosRequestAdapter(params)
    expect(adapter).toBeInstanceOf(VideosRequestAdapter)
  })

  it('should convert InputVideosRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputVideosRequest
    const adapter = new VideosRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
