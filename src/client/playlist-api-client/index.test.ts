import { describe, it, expect, vi } from 'vitest'
import { PlaylistApiClient } from '.'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { PlaylistsRequest } from './types/playlists-request'
import { PlaylistsResponse } from './types/playlists-response'

describe('PlaylistApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: Omit<PlaylistsRequest, 'key'> = {
    part: 'snippet',
    channelId: 'test-channel',
  }
  const mockResponse: PlaylistsResponse = {
    etag: 'etag',
    kind: 'youtube#playlistListResponse',
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    nextPageToken: '',
    prevPageToken: '',
    items: [],
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new PlaylistApiClient('')).toThrowError(
      'API key is required to initialize PlaylistApiClient',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new PlaylistApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    const expectedUrl = `${BASE_YOUTUBE_API_V3_URL}/playlists?part=snippet&channelId=test-channel&key=${mockApiKey}`

    expect(mockFetch).toHaveBeenCalledWith(expectedUrl)
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

    const client = new PlaylistApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    const expectedUrl = `${BASE_YOUTUBE_API_V3_URL}/playlists?part=snippet&channelId=test-channel&key=${mockApiKey}`
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl)
  })
})
