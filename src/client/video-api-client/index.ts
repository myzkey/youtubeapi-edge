import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { VideosRequest } from './types/videos-request'
import { VideosResponse } from './types/videos-response'
import { appendParamsToUrl } from '~/utils/url'

export class VideoApiClient {
  private apiKey: string
  private client: typeof fetch = fetch

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error('API key is required to initialize VideoApiClient')
    }
    this.apiKey = apiKey
    this.client = client.bind(globalThis)
  }

  async find(params: VideosRequest): Promise<VideosResponse> {
    const url = appendParamsToUrl(
      `${BASE_YOUTUBE_API_V3_URL}/videos`,
      params,
      this.apiKey,
    )
    const response = await this.client(url.toString())

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      const errorMessage = errorBody?.error?.message || 'Unknown error occurred'

      throw new Error(
        `YouTube API error: ${response.status} - ${response.statusText} - ${errorMessage}`,
      )
    }

    return response.json() as Promise<VideosResponse>
  }
}
