import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { ChannelsRequest } from "./ChannelRequest";
import { ChannelsResponse } from "./ChannelsResponse";
import { appendParamsToUrl } from "~/utils/url";

export class ChannelApiClient {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize ChannelApiClient");
    }
    this.apiKey = apiKey;
    this.client = client.bind(globalThis);
  }

  async find(params: Omit<ChannelsRequest, 'key'>): Promise<ChannelsResponse> {
    const url = appendParamsToUrl(`${BASE_YOUTUBE_API_V3_URL}/channels`, params, this.apiKey);
    const response = await this.client(url.toString());

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText}`);
    }

    return response.json() as Promise<ChannelsResponse>;
  }
}