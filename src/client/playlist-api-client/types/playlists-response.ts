import {
  BasePageInfoResponse,
  BaseResponse,
  BaseThumbnail,
} from '~/client/types/base-response'

/**
 * Youtube Data API > `playlists`のレスポンス
 * 公式Docs: https://developers.google.com/youtube/v3/docs/playlists/list?hl=ja
 */
export type PlaylistsResponse = BaseResponse &
  BasePageInfoResponse & {
    /**
     * 結果は配列形式で格納される。
     */
    items: {
      kind: string
      etag: string
      id: string
      /**
       * 再生リストの基本情報。
       */
      snippet: PlaylistsResponseSnippet
      /**
       * 再生リストのステータス情報。
       * 例: `snippet.type`が`videoRated`である場合、当情報は評価された動画情報を指す。
       */
      status: PlaylistsResponseStatus
      /**
       * 再生リストのコンテンツ情報(動画数など)。
       */
      contentDetails: PlaylistsResponseContentDetails
      /**
       * 再生リストの動画プレイヤー情報(埋め込みタグ情報など)。
       */
      player: PlaylistsResponsePlayer
    }[]
  }

type PlaylistsResponseSnippet = {
  /**
   * アクティビティ発生日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string
  /**
   * 再生リスト発行元のチャンネルID。
   */
  channelId: string
  /**
   * 再生リスト発行元のチャンネルのタイトル。
   */
  channelTitle: string
  /**
   * 再生リストのタイトル。
   */
  title: string
  /**
   * 再生リストの説明。
   */
  description: string
  /**
   * 再生リストのサムネイル。
   */
  thumbnails: BaseThumbnail
}

type PlaylistsResponseStatus = {
  /**
   * 再生リストのプライバシーステータス。
   * - `private`: 非公開
   * - `public`: 公開
   * - `unlisted`: 限定公開(多分)
   */
  privacyStatus: 'private' | 'public' | 'unlisted'

  podcastStatus: 'enabled' | 'disabled' | 'unspecified'
}

type PlaylistsResponseContentDetails = {
  /**
   * 再生リスト内部に入っている動画数。
   */
  itemCount: number
}

type PlaylistsResponsePlayer = {
  /**
   * 動画再生プレイヤーとなる`<iframe>`タグ。
   */
  embedHtml: string
}
