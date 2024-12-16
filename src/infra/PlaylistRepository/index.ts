import { BASE_YOUTUBE_API_V3_URL } from "~/helpers/const";
import { IPlaylistsRequest } from "~/presentation/playlist/IPlaylistsRequest";
import { IPlaylistsResponse } from "~/presentation/playlist/IPlaylistsResponse";

export class PlaylistRepository {
  private apiKey: string
  private client: typeof fetch = fetch;

  constructor(apiKey: string, client: typeof fetch = fetch) {
    if (!apiKey) {
      throw new Error("API key is required to initialize PlaylistRepository");
    }
    this.apiKey = apiKey;
    this.client = client;
  }

  async find(params: IPlaylistsRequest): Promise<IPlaylistsResponse> {
    const url = new URL(`${BASE_YOUTUBE_API_V3_URL}/channels`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    url.searchParams.append('key', this.apiKey);

    const response = await this.client(url.toString());
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`YouTube API error: ${response.status} - ${response.statusText} - ${errorBody.error?.message}`);
    }
    return response.json() as Promise<IPlaylistsResponse>;
  }
}