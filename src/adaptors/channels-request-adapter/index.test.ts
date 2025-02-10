import { describe, it, expect } from 'vitest'
import { ChannelsRequestAdapter } from './index'
import { InputChannelsRequest } from '~/input-types/input-channel-request'

describe('ChannelsRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputChannelsRequest
    expect(() => new ChannelsRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = { part: ['snippet'], maxResults: -1 } as InputChannelsRequest
    expect(() => new ChannelsRequestAdapter(params)).toThrowError(
      'maxResults must be between 1 and 50.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputChannelsRequest
    const adapter = new ChannelsRequestAdapter(params)
    expect(adapter).toBeInstanceOf(ChannelsRequestAdapter)
  })

  it('should convert InputChannelsRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputChannelsRequest
    const adapter = new ChannelsRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
