import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { VideosRequest } from "./VideosRequest";
import { VideosResponse } from "./VideosResponse";

export class VideoApiClient {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize VideoApiClient");
    }
    this.apiKey = apiKey;
    this.client = client.bind(globalThis);
  }

  async find(params: VideosRequest): Promise<VideosResponse> {
    const url = new URL(`${BASE_YOUTUBE_API_V3_URL}/videos`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    url.searchParams.append('key', this.apiKey);

    const response = await this.client(url.toString());
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }
}