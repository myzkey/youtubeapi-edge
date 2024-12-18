import { describe, it, expect, vi } from 'vitest'
import { SearchApiClient } from '.'
import { SearchRequest } from './types/SearchRequest'
import { SearchResponse } from './types/SearchResponse'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'

describe('SearchApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: SearchRequest = { part: 'snippet', q: 'test query' }
  const mockResponse: SearchResponse = {
    etag: 'etag',
    kind: 'youtube#searchListResponse',
    items: {
      kind: 'youtube#searchResult',
      etag: 'etag',
      id: '',
      snippet: {
        publishedAt: '2021-01-01T00:00:00Z',
        channelId: 'channelId',
        title: 'title',
        description: 'description',
        thumbnails: {
          default: {
            url: 'url',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'url',
            width: 320,
            height: 180,
          },
          high: {
            url: 'url',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'channelTitle',
        liveBroadcastContent: 'none',
        publishTime: '2021-01-01T00:00:00Z',
      },
    },
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    nextPageToken: '',
    prevPageToken: '',
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new SearchApiClient('')).toThrowError(
      'API key is required to initialize SearchRepository',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new SearchApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/search?part=snippet&q=test+query&key=mock-api-key`,
    )
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if the response is not ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    })

    const client = new SearchApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 403 - Forbidden',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/search?part=snippet&q=test+query&key=mock-api-key`,
    )
  })
})
