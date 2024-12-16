import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { IActivitiesRequest, IActivitiesResponse } from "~/presentation/activities";

export class ActivityRepository {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize ActivityRepository");
    }
    this.apiKey = apiKey;
    this.client = client;
  }

  async find(params: IActivitiesRequest): Promise<IActivitiesResponse> {
    const url = new URL(`${BASE_YOUTUBE_API_V3_URL}/channels`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    url.searchParams.append('key', this.apiKey);

    const response = await this.client(url.toString());
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText} - ${errorBody.error?.message}`);
    }
    return response.json() as Promise<IActivitiesResponse>;
  }
}