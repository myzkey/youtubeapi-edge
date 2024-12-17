import { BASE_YOUTUBE_API_V3_URL } from '~/helpers/const'
import { appendParamsToUrl } from '~/utils/url'
import { ActivitiesRequest } from './ActivitiesRequest'
import { ActivitiesResponse } from './ActivitiesResponse'

export class ActivityApiClient {
  private apiKey: string
  private client: typeof fetch = fetch

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error('API key is required to initialize ActivityRepository')
    }
    this.apiKey = apiKey
    this.client = client.bind(globalThis)
  }

  async find(params: ActivitiesRequest): Promise<ActivitiesResponse> {
    const url = appendParamsToUrl(
      `${BASE_YOUTUBE_API_V3_URL}/activities`,
      params,
      this.apiKey,
    )
    const response = await this.client(url.toString())

    if (!response.ok) {
      throw new Error(
        `YouTube API error: ${response.status} - ${response.statusText}`,
      )
    }

    return response.json() as Promise<ActivitiesResponse>
  }
}
