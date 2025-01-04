import { ChannelsRequestAdapter } from './adaptors/ChannelsRequestAdapter'
import { VideosRequestAdapter } from './adaptors/VideosRequestAdapter'
import { ChannelApiClient, SearchApiClient, VideoApiClient } from './client'
import type {
  ChannelsRequest,
  ChannelsResponse,
  SearchRequest,
  SearchResponse,
  VideosRequest,
  VideosResponse,
} from './client'

export const youtubeapiEdge = (params: { version: 'v3'; auth: string }) => {
  return {
    videos: {
      list: async (requestParams: VideosRequest): Promise<VideosResponse> => {
        const client = new VideoApiClient(params.auth)
        const request = new VideosRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
        return result
      },
    },
    search: {
      list: async (requestParams: SearchRequest): Promise<SearchResponse> => {
        const client = new SearchApiClient(params.auth)
        const result = await client.find(requestParams)
        return result
      },
    },
    channels: {
      list: async (
        requestParams: ChannelsRequest,
      ): Promise<ChannelsResponse> => {
        const client = new ChannelApiClient(params.auth)
        const request = new ChannelsRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
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
