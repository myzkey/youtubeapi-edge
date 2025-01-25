import { describe, it, expect, vi } from 'vitest'
import { VideoCategoriesApiClient } from '.'
import { VideoCategoriesRequest } from './types/video-categories-request'
import { VideoCategoriesResponse } from './types/video-categories-response'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'

describe('VideoCategoriesApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: VideoCategoriesRequest = { part: 'snippet' }
  const mockResponse: VideoCategoriesResponse = {
    etag: 'etag',
    kind: 'youtube#videoCategoryListResponse',
    items: [
      {
        id: 'id',
        kind: 'kind',
        etag: 'etag',
        snippet: {
          channelId: 'channelId',
          title: 'title',
          assignable: true,
        },
      },
    ],
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new VideoCategoriesApiClient('')).toThrowError(
      'API key is required to initialize VideoCategoriesApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new VideoCategoriesApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/videoCategories?part=snippet&key=mock-api-key`,
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
    const client = new VideoCategoriesApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/videoCategories?part=snippet&key=mock-api-key`,
    )
  })
})
