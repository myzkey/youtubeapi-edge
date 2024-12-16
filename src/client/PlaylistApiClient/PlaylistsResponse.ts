import {
  BasePageInfoResponse,
  BaseResponse,
  BaseThumbnail,
} from "~/client/types/BaseResponse";

/**
 * Youtube Data API > `playlists`のレスポンス
 * 公式Docs: https://developers.google.com/youtube/v3/docs/playlists/list?hl=ja
 */
export type PlaylistsResponse = BaseResponse & BasePageInfoResponse & {
  /**
   * 結果は配列形式で格納される。
   */
  items: {
    kind: string;
    etag: string;
    id: string;
    /**
     * 再生リストの基本情報。
     */
    snippet: PlaylistsResponseSnippet;
    /**
     * 再生リストのステータス情報。
     * 例: `snippet.type`が`videoRated`である場合、当情報は評価された動画情報を指す。
     */
    status: PlaylistsResponseStatus;
    /**
     * 再生リストのコンテンツ情報(動画数など)。
     */
    contentDetails: PlaylistsResponseContentDetails;
    /**
     * 再生リストの動画プレイヤー情報(埋め込みタグ情報など)。
     */
    player: PlaylistsResponsePlayer;
  }[];
}

export type PlaylistsResponseSnippet = {
  /**
   * アクティビティ発生日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string
  /**
   * アクティビティ種別。以下が指定される:
   * - `bulletin`: お知らせメッセージ
   * - `channelItem`: チャンネルへリソース追加
   * - `comment`: 動画orチャンネルへコメントを行った
   * - `favorite`: 動画をお気に入りにした
   * - `like`: 高評価を押した
   * - `playlistItem`: 再生リストに追加した
   * - `recommendation`: 動画等のリソースをお勧めされた
   * - `social`: SNSヘ投稿
   * - `subscription`: チャンネル登録した
   * - `upload`: 動画アップロード
   */
  type: string;
  /**
   * 再生リスト発行元のチャンネルID。
   */
  channelId: string;
  /**
   * 再生リスト発行元のチャンネルのタイトル。
   */
  channelTitle: string;
  /**
   * 再生リストのタイトル。
   */
  title: string;
  /**
   * 再生リストの説明。
   */
  description: string;
  /**
   * 再生リストのサムネイル。
   */
  thumbnails: BaseThumbnail;
  /**
   * 再生リストのタグ。
   */
  tags: string[];
}

export type PlaylistsResponseStatus = {
  /**
   * 再生リストのプライバシーステータス。
   * - `private`: 非公開
   * - `public`: 公開
   * - `unlisted`: 限定公開(多分)
   */
  privacyStatus: string;
}

export type PlaylistsResponseContentDetails = {
  /**
   * 再生リスト内部に入っている動画数。
   */
  itemCount: number;
}

export type PlaylistsResponsePlayer = {
  /**
   * 動画再生プレイヤーとなる`<iframe>`タグ。
   */
  embedHtml: string;
}