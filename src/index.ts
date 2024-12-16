import { ChannelRepository } from "./infra/ChannelRepository";
import { SearchRepository } from "./infra/SearchRepository";
import { VideoRepository } from "./infra/VideoRepository";
import { IChannelsRequest, IChannelsResponse } from "./presentation/channel";
import { ISearchRequest, ISearchResponse } from "./presentation/search";
import { IVideosRequest, IVideosResponse } from "./presentation/video";

const VERSIONS = {
  v3: 'v3',
} as const;

export const youtubeClient = (
  params: {
    version: keyof typeof VERSIONS;
    auth: string
  }) => {
  return {
    videos: {
      list: async (requestParams: IVideosRequest): Promise<IVideosResponse> => {
        const repo = new VideoRepository(params.auth);
        const result = await repo.find(requestParams);
        return result;
      }
    },
    search: {
      list: async (requestParams: ISearchRequest): Promise<ISearchResponse> => {
        const repo = new SearchRepository(params.auth);
        const result = await repo.find(requestParams);
        return result;
      }
    },
    channels: {
      list: async (requestParams: IChannelsRequest): Promise<IChannelsResponse>  => {
        const repo = new ChannelRepository(params.auth);
        const result = await repo.find(requestParams);
        return result;
      }
    },
  };
};
