import { describe, it, expect, vi } from 'vitest'
import { ChannelApiClient } from '.'
import { ChannelsRequest } from './types/ChannelRequest'
import { ChannelsResponse } from './types/ChannelsResponse'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'

describe('ChannelApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: Omit<ChannelsRequest, 'key'> = {
    part: 'snippet',
    id: 'channelId',
  }
  const mockResponse: ChannelsResponse = {
    items: [],
    kind: 'youtube#channelListResponse',
    etag: 'etag',
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    nextPageToken: '',
    prevPageToken: '',
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new ChannelApiClient('')).toThrowError(
      'API key is required to initialize ChannelApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new ChannelApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/channels?part=snippet&id=channelId&key=mock-api-key`,
    )
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({
        error: {
          message: 'ErrorMessage',
        },
      }),
    })

    const client = new ChannelApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/channels?part=snippet&id=channelId&key=mock-api-key`,
    )
  })
})
