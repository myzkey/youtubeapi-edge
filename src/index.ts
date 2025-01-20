import {
  ChannelsRequestAdapter,
  SearchRequestAdapter,
  VideosRequestAdapter,
  PlaylistsRequestAdapter,
  CommentThreadsRequestAdapter,
} from './adaptors'
import {
  ChannelApiClient,
  CommentThreadsApiClient,
  PlaylistApiClient,
  SearchApiClient,
  VideoApiClient,
} from './client'
import type {
  ChannelsRequest,
  ChannelsResponse,
  PlaylistsResponse,
  SearchRequest,
  SearchResponse,
  VideosRequest,
  VideosResponse,
  CommentThreadsResponse,
} from './client'
import {
  InputChannelsRequest,
  InputCommentThreadsRequest,
  InputPlaylistsRequest,
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
    playlists: {
      list: async (
        requestParams: InputPlaylistsRequest,
      ): Promise<PlaylistsResponse> => {
        const client = new PlaylistApiClient(params.auth)
        const request = new PlaylistsRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
        return result
      },
    },
    commentThreads: {
      list: async (
        requestParams: InputCommentThreadsRequest,
      ): Promise<CommentThreadsResponse> => {
        const client = new CommentThreadsApiClient(params.auth)
        const request = new CommentThreadsRequestAdapter(requestParams)
        const result = await client.find(request.toParams())
        return result
      },
    },
  }
}

export type {
  InputChannelsRequest,
  InputPlaylistsRequest,
  InputSearchRequest,
  InputVideosRequest,
  ChannelsRequest,
  ChannelsResponse,
  SearchRequest,
  SearchResponse,
  VideosRequest,
  VideosResponse,
}
