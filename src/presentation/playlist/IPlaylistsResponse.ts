import {
  IBasePageInfoResponse,
  IBaseResponse,
  IBaseThumbnail,
} from "~/types/IBaseResponse";

/**
 * Youtube Data API > `playlists`のレスポンス
 * 公式Docs: https://developers.google.com/youtube/v3/docs/playlists/list?hl=ja
 */
export interface IPlaylistsResponse
  extends IBaseResponse,
    IBasePageInfoResponse {
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
    snippet: IPlaylistsResponse_Snippet;
    /**
     * 再生リストのステータス情報。
     * 例: `snippet.type`が`videoRated`である場合、当情報は評価された動画情報を指す。
     */
    status: IPlaylistsResponse_Status;
    /**
     * 再生リストのコンテンツ情報(動画数など)。
     */
    contentDetails: IPlaylistsResponse_ContentDetails;
    /**
     * 再生リストの動画プレイヤー情報(埋め込みタグ情報など)。
     */
    player: IPlaylistsResponse_Player;
  }[];
}

export interface IPlaylistsResponse_Snippet {
  /**
   * アクティビティ発生日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string;
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
  thumbnails: IBaseThumbnail;
  /**
   * 再生リストのタグ。
   */
  tags: string[];
}

export interface IPlaylistsResponse_Status {
  /**
   * 再生リストのプライバシーステータス。
   * - `private`: 非公開
   * - `public`: 公開
   * - `unlisted`: 限定公開(多分)
   */
  privacyStatus: string;
}

export interface IPlaylistsResponse_ContentDetails {
  /**
   * 再生リスト内部に入っている動画数。
   */
  itemCount: number;
}

export interface IPlaylistsResponse_Player {
  /**
   * 動画再生プレイヤーとなる`<iframe>`タグ。
   */
  embedHtml: string;
}