import { describe, it, expect } from 'vitest'
import { PlaylistsRequestAdapter } from './index'
import { InputPlaylistsRequest } from '~/input-types'

describe('PlaylistsRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputPlaylistsRequest
    expect(() => new PlaylistsRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = {
      part: ['snippet'],
      maxResults: -1,
    } as InputPlaylistsRequest
    expect(() => new PlaylistsRequestAdapter(params)).toThrowError(
      'maxResults must be between 0 and 50.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = {
      channelId: 'sample',
      part: ['snippet'],
    } as InputPlaylistsRequest
    const adapter = new PlaylistsRequestAdapter(params)
    expect(adapter).toBeInstanceOf(PlaylistsRequestAdapter)
  })

  it('should convert InputPlaylistsRequest to ChannelsRequest', () => {
    const params = {
      channelId: 'sample',
      part: ['snippet', 'contentDetails'],
    } as InputPlaylistsRequest
    const adapter = new PlaylistsRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
