import {
  BasePageInfoResponse,
  BaseResponse,
  BaseThumbnail,
} from '~/client/types/base-response'

/**
 * Youtube Data API > `search`のレスポンス。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/search/list?hl=ja
 */
export type SearchResponse = BaseResponse &
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
      snippet: ISearchResponseSnippet
    }
  }

export type ISearchResponseSnippet = {
  /**
   * コンテンツ投稿日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string
  /**
   * コンテンツを投稿したチャンネルID。
   */
  channelId: string
  /**
   * コンテンツを投稿したチャンネル名。
   */
  channelTitle: string
  /**
   * コンテンツのタイトル。
   * 動画なら動画のタイトルが入る。
   */
  title: string
  /**
   * コンテンツの説明。
   * 動画なら動画の説明が入る。
   */
  description: string
  /**
   * コンテンツのサムネイル情報。
   */
  thumbnails: BaseThumbnail
  /**
   * ライブ配信ステータス。
   * - `live`: APIリクエスト時点でライブ配信中
   * - `upcoming`: ライブ配信予約されている動画であり、まだライブ配信されてない状態
   * - `none`: ライブ配信ではない動画orライブ配信終了済みの動画
   */
  liveBroadcastContent: 'live' | 'upcoming' | 'none'
  /**
   * コンテンツの公開日時(?)。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishTime: string
}
