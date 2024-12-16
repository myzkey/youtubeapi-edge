import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { ActivitiesRequest } from "./ActivitiesRequest";
import { ActivitiesResponse } from "./ActivitiesResponse";

export class ActivityApiClient {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize ActivityRepository");
    }
    this.apiKey = apiKey;
    this.client = client.bind(globalThis);
  }

  async find(params: ActivitiesRequest): Promise<ActivitiesResponse> {
    const url = new URL(`${BASE_YOUTUBE_API_V3_URL}/channels`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    url.searchParams.append('key', this.apiKey);

    const response = await this.client(url.toString());
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText} - ${errorBody.error?.message}`);
    }
    return response.json() as Promise<ActivitiesResponse>;
  }
}