import { ChannelsRequestAdapter } from './adaptors/channels-request-adapter'
import { SearchRequestAdapter } from './adaptors/search-request-adapter'
import { VideosRequestAdapter } from './adaptors/videos-request-adapter'
import { ChannelApiClient, SearchApiClient, VideoApiClient } from './client'
import type {
  ChannelsRequest,
  ChannelsResponse,
  SearchRequest,
  SearchResponse,
  VideosRequest,
  VideosResponse,
} from './client'
import {
  InputChannelsRequest,
  InputSearchRequest,
  InputVideosRequest,
} from './input-types'

export const youtubeapiEdge = (params: { version: 'v3'; auth: string }) => {
  return {
    videos: {
      list: async (
        requestParams: InputVideosRequest,
      ): Promise<VideosResponse> => {
        const client = new VideoApiClient(params.auth)
        const request = new VideosRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
        return result
      },
    },
    search: {
      list: async (
        requestParams: InputSearchRequest,
      ): Promise<SearchResponse> => {
        const client = new SearchApiClient(params.auth)
        const request = new SearchRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
        return result
      },
    },
    channels: {
      list: async (
        requestParams: InputChannelsRequest,
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
