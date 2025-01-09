import { describe, it, expect, vi } from 'vitest'
import { ActivityApiClient } from '.'
import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { ActivitiesRequest } from './types/activities-request'
import { ActivitiesResponse } from './types/activities-response'

describe('ActivityApiClient', () => {
  const mockApiKey = 'mock-api-key'
  const baseParams: Omit<ActivitiesRequest, 'key'> = {
    part: 'snippet',
    channelId: 'test-channel',
  }
  const mockResponse: ActivitiesResponse = {
    etag: 'etag',
    kind: 'youtube#activityListResponse',
    items: [],
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    nextPageToken: '',
    prevPageToken: '',
  }

  it('should throw an error if API key is not provided', () => {
    expect(() => new ActivityApiClient('')).toThrowError(
      'API key is required to initialize ActivityRepository',
    )
  })

  it('should fetch data successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const client = new ActivityApiClient(mockApiKey, mockFetch)
    const response = await client.find(baseParams)

    const expectedUrl = `${BASE_YOUTUBE_API_V3_URL}/activities?part=snippet&channelId=test-channel&key=${mockApiKey}`

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

    const client = new ActivityApiClient(mockApiKey, mockFetch)

    await expect(client.find(baseParams)).rejects.toThrowError(
      'YouTube API error: 400 - Bad Request - ErrorMessage',
    )

    const expectedUrl = `${BASE_YOUTUBE_API_V3_URL}/activities?part=snippet&channelId=test-channel&key=${mockApiKey}`
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl)
  })
})
