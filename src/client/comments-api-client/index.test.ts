import { describe, it, expect, vi } from 'vitest'
import { CommentsApiClient } from '.'
import { CommentsRequest } from './types/comments-request'
import { CommentsResponse } from './types/comments-response'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'

describe('CommentsApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: CommentsRequest = { part: 'snippet' }
  const mockResponse: CommentsResponse = {
    etag: 'etag',
    kind: 'youtube#searchListResponse',
    items: {
      kind: 'youtube#searchResult',
      etag: 'etag',
      id: '',
      snippet: {
        channelId: 'channelId',
        textDisplay: 'textDisplay',
        textOriginal: 'textOriginal',
        authorDisplayName: 'authorDisplayName',
        authorProfileImageUrl: 'authorProfileImageUrl',
        authorChannelUrl: 'authorChannelUrl',
        authorChannelId: {
          value: 'value',
        },
        canRate: true,
        viewerRating: 'viewerRating',
        likeCount: 0,
        publishedAt: 'publishedAt',
        updatedAt: 'updatedAt',
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
    expect(() => new CommentsApiClient('')).toThrowError(
      'API key is required to initialize CommentsApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new CommentsApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/comments?part=snippet&key=mock-api-key`,
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
    const client = new CommentsApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/comments?part=snippet&key=mock-api-key`,
    )
  })
})
