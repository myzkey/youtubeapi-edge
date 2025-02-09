import {
  BasePageInfoResponse,
  BaseResponse,
} from '~/client/types/base-response'

/**
 * Youtube Data API > `search`のレスポンス。
 * https://developers.google.com/youtube/v3/docs/commentThreads/list?hl=ja
 */
export type CommentThreadsResponse = BaseResponse &
  BasePageInfoResponse & {
    /**
     * 結果は配列形式で格納される。
     */
    items: {
      kind: string
      etag: string
      id: string
      /**
       * コンテンツの基本情報。
       */
      snippet: CommentThreadsResponseSnippet
      replies?: {
        comments: CommentThreadsResponseComment[]
      }
    }[]
  }

type CommentThreadsResponseSnippet = {
  /**
   * コンテンツを投稿したチャンネルID。
   */
  channelId: string
  /**
   * Video ID.
   */
  videoId: string
  topLevelComment: {
    id: string
    kind: string
    etag: string

    snippet: {
      channelId: string
      videoId: string
      textDisplay: string
      textOriginal: string
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
  }
  canReply: boolean
  totalReplyCount: number
  isPublic: boolean
}

type CommentThreadsResponseComment = {
  id: string
  kind: string
  etag: string
  snippet: {
    channelId: string
    videoId: string
    textDisplay: string
    textOriginal: string
    parentId: string
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
}
