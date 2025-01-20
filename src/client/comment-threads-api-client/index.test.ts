import { describe, it, expect, vi } from 'vitest'
import { CommentThreadsApiClient } from '.'
import { CommentThreadsRequest } from './types/comment-threads-request'
import { CommentThreadsResponse } from './types/comment-threads-response'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'

describe('CommentThreadsApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: CommentThreadsRequest = { part: 'snippet' }
  const mockResponse: CommentThreadsResponse = {
    etag: 'etag',
    kind: 'youtube#searchListResponse',
    items: {
      kind: 'youtube#searchResult',
      etag: 'etag',
      id: '',
      snippet: {
        channelId: 'channelId',
        videoId: 'videoId',
        canReply: true,
        totalReplyCount: 0,
        isPublic: true,
        topLevelComment: {
          id: 'id',
          kind: 'kind',
          etag: 'etag',
          snippet: {
            channelId: 'channelId',
            videoId: 'videoId',
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
    expect(() => new CommentThreadsApiClient('')).toThrowError(
      'API key is required to initialize CommentThreadsApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new CommentThreadsApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/commentThreads?part=snippet&key=mock-api-key`,
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
    const client = new CommentThreadsApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_YOUTUBE_API_V3_URL}/commentThreads?part=snippet&key=mock-api-key`,
    )
  })
})
