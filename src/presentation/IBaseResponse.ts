/**
 * Youtube Data APIの共通レスポンス。
 */
export interface IBaseResponse {
  /**
   * APIリソースタイプ。
   * 例: `youtube#channelListResponse`
   */
  kind: string;
  /**
   * このリソースのEtag。
   */
  etag: string;
}

/**
 * ページングが備わっているコンテンツの場合付与されるレスポンス型。
 */
export interface IBasePageInfoResponse {
  /**
   * 結果セットのページング情報。
   */
  pageInfo: {
    /**
     * 結果セット内の結果の総数。
     */
    totalResults: number;
    /**
     * APIレスポンスに含まれる結果の数。
     */
    resultsPerPage: number;
  };
  /**
   * 次ページへのページングトークン。
   */
  nextPageToken: string;
  /**
   * 前ページへのページングトークン。
   */
  prevPageToken: string;
}

/**
 * サムネイル情報。
 */
export interface IBaseThumbnail {
  /**
   * デフォルトのサムネイル画像。
   * - 動画: 120px x 90px
   * - チャンネル: 88px x 88px
   */
  default: IBaseThumbnailItem;
  /**
   * 低解像度のサムネイル画像。
   * - 動画: 320px x 180px
   * - チャンネル: 240px x 240px
   */
  medium: IBaseThumbnailItem;
  /**
   * 高解像度のサムネイル画像。
   * - 動画: 480px x 360px
   * - チャンネル: 800px x 800px
   */
  high: IBaseThumbnailItem;
}
export interface IBaseThumbnailItem {
  /**
   * 画像URL。
   */
  url: string;
  /**
   * 画像幅。
   */
  width: number;
  /**
   * 画像の高さ。
   */
  height: number;
}