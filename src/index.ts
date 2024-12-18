import { ChannelApiClient } from './client/ChannelApiClient'
import { ChannelsRequest } from './client/ChannelApiClient/types/ChannelRequest'
import { ChannelsResponse } from './client/ChannelApiClient/types/ChannelsResponse'
import { SearchApiClient } from './client/SearchApiClient'
import { SearchRequest } from './client/SearchApiClient/types/SearchRequest'
import { SearchResponse } from './client/SearchApiClient/types/SearchResponse'
import { VideoApiClient } from './client/VideoApiClient'
import { VideosRequest } from './client/VideoApiClient/types/VideosRequest'
import { VideosResponse } from './client/VideoApiClient/types/VideosResponse'

export const youtubeapiEdge = (params: { version: 'v3'; auth: string }) => {
  return {
    videos: {
      list: async (requestParams: VideosRequest): Promise<VideosResponse> => {
        const client = new VideoApiClient(params.auth)
        const result = await client.find(requestParams)
        return result
      },
    },
    search: {
      list: async (requestParams: SearchRequest): Promise<SearchResponse> => {
        const repo = new SearchApiClient(params.auth)
        const result = await repo.find(requestParams)
        return result
      },
    },
    channels: {
      list: async (
        requestParams: ChannelsRequest,
      ): Promise<ChannelsResponse> => {
        const client = new ChannelApiClient(params.auth)
        const result = await client.find(requestParams)
        return result
      },
    },
  }
}

export type {
  ChannelsRequest,
  ChannelsResponse,
  SearchRequest,
  SearchResponse,
  VideosRequest,
  VideosResponse,
}
