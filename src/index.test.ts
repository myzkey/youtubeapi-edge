import { describe, it, expect, vi } from 'vitest'
import { youtubeapiEdge } from '.'
import { ChannelApiClient, SearchApiClient, VideoApiClient } from './client'

vi.mock('~/client/video-api-client', () => {
  return {
    VideoApiClient: vi.fn().mockImplementation(() => ({
      find: vi.fn().mockResolvedValue({ kind: 'youtube#videoListResponse' }),
    })),
  }
})

vi.mock('~/client/search-api-client', () => {
  return {
    SearchApiClient: vi.fn().mockImplementation(() => ({
      find: vi.fn().mockResolvedValue({ kind: 'youtube#searchListResponse' }),
    })),
  }
})

vi.mock('~/client/channel-api-client', () => {
  return {
    ChannelApiClient: vi.fn().mockImplementation(() => ({
      find: vi.fn().mockResolvedValue({ kind: 'youtube#channelListResponse' }),
    })),
  }
})

describe('youtubeapiEdge', () => {
  const auth = 'test-api-key'

  it('should call VideoApiClient correctly', async () => {
    const api = youtubeapiEdge({ version: 'v3', auth })
    const response = await api.videos.list({ part: ['snippet'], id: 'videoId' })

    expect(VideoApiClient).toHaveBeenCalledWith(auth)
    expect(response).toEqual({ kind: 'youtube#videoListResponse' })
  })

  it('should call SearchApiClient correctly', async () => {
    const api = youtubeapiEdge({ version: 'v3', auth })
    const response = await api.search.list({
      part: ['snippet'],
      q: 'test query',
    })

    expect(SearchApiClient).toHaveBeenCalledWith(auth)
    expect(response).toEqual({ kind: 'youtube#searchListResponse' })
  })

  it('should call ChannelApiClient correctly', async () => {
    const api = youtubeapiEdge({ version: 'v3', auth })
    const response = await api.channels.list({
      part: ['snippet'],
      id: 'channelId',
    })

    expect(ChannelApiClient).toHaveBeenCalledWith(auth)
    expect(response).toEqual({ kind: 'youtube#channelListResponse' })
  })
})
