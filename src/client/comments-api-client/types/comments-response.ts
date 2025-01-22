import {
  BasePageInfoResponse,
  BaseResponse,
} from '~/client/types/base-response'

/**
 * https://developers.google.com/youtube/v3/docs/comments?hl=ja
 */
export type CommentsResponse = BaseResponse &
  BasePageInfoResponse & {
    items: {
      kind: string
      etag: string
      id: string
      snippet: CommentsResponseSnippet
    }
  }

type CommentsResponseSnippet = {
  channelId: string
  textDisplay: string
  textOriginal: string
  parentId?: string
  authorDisplayName: string
  authorProfileImageUrl: string
  authorChannelUrl: string
  authorChannelId: {
    value: string
  }
  canRate: boolean
  viewerRating: string
  likeCount: number
  publishedAt: string
  updatedAt: string
}
