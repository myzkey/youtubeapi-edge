import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { ISearchRequest, ISearchResponse } from "~/presentation/search";

export class SearchRepository {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize SearchRepository");
    }
    this.apiKey = apiKey;
    this.client = client;
  }

  async find(params: ISearchRequest): Promise<ISearchResponse> {
    const url = new URL(`${BASE_YOUTUBE_API_V3_URL}/search`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    url.searchParams.append('key', this.apiKey);

    const response = await this.client(url.toString());
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }
}