import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { PlaylistsRequest } from './types/PlaylistsRequest'
import { PlaylistsResponse } from './types/PlaylistsResponse'
import { appendParamsToUrl } from '~/utils/url'

export class PlaylistApiClient {
  private apiKey: string
  private client: typeof fetch = fetch

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error('API key is required to initialize PlaylistApiClient')
    }
    this.apiKey = apiKey
    this.client = client.bind(globalThis)
  }

  async find(params: PlaylistsRequest): Promise<PlaylistsResponse> {
    const url = appendParamsToUrl(
      `${BASE_YOUTUBE_API_V3_URL}/playlists`,
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

    return response.json() as Promise<PlaylistsResponse>
  }
}
