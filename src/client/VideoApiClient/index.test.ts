import { describe, it, expect, vi } from 'vitest'
import { VideoApiClient } from '.'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { VideosRequest } from './types/VideosRequest'
import { VideosResponse } from './types/VideosResponse'

describe('VideoApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: VideosRequest = { part: 'snippet', id: 'videoId' }
  const mockResponse: VideosResponse = {
    kind: 'youtube#videoListResponse',
    items: [],
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    etag: 'etag',
    nextPageToken: '',
    prevPageToken: '',
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new VideoApiClient('')).toThrowError(
      'API key is required to initialize VideoApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new VideoApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/videos?part=snippet&id=videoId&key=mock-api-key`,
    )
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    })

    const client = new VideoApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 403 - Forbidden',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/videos?part=snippet&id=videoId&key=mock-api-key`,
    )
  })
})
