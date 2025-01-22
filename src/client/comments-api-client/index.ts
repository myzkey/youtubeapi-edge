import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { CommentsRequest } from './types/comments-request'
import { CommentsResponse } from './types/comments-response'
import { appendParamsToUrl } from '~/utils/url'

export class CommentsApiClient {
  private apiKey: string
  private client: typeof fetch = fetch

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error('API key is required to initialize CommentsApiClient')
    }
    this.apiKey = apiKey
    this.client = client.bind(globalThis)
  }

  async find(params: CommentsRequest): Promise<CommentsResponse> {
    const url = appendParamsToUrl(
      `${BASE_YOUTUBE_API_V3_URL}/comments`,
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

    return response.json() as Promise<CommentsResponse>
  }
}
