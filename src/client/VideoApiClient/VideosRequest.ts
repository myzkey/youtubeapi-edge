/**
 * Youtube Data API > `videos`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/videos/list?hl=ja
 *
 * 指定方法は3通り:
 * - 動画IDを指定: `id`
 * - グラフで指定: `chart`
 * - 認証ユーザーの高評価動画/低評価動画で指定: `myRating`
 */
export type VideosRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   * - `id`
   * - `snippet`: 動画の基本情報
   * - `contentDetails`: 動画のコンテンツ情報
   * - `status`: 動画のアップロード、処理、プライバシーステータス情報
   * - `statistics`: 動画の統計情報
   * - `player`: 動画の埋め込み時に使用される設定
   * - `topicDetails`: 動画に関連づけられているFreebaseのトピック情報
   * - `recordingDetails`: 動画が録画された場所、日付、住所情報
   * - `liveStreamingDetails`: ライブ配信情報
   * - `fileDetails`: ファイルの解像度、長さ、オーディオと動画のコーデック、ストリーミングのビットレートなど(OAuth認証して指定動画を所有しているユーザーからでないと指定不可)
   * - `processingDetails`: アップロード動画の処理進捗状況(OAuth認証して指定動画を所有しているユーザーからでないと指定不可)
   * - `suggestions`: アップロード済み動画の動画品質を向上させる方法やメタデータを示す提案(OAuth認証して指定動画を所有しているユーザーからでないと指定不可)
   */
  part: string;
  /**
   * 取得対象の動画ID。
   */
  id?: string;
  /**
   * 取得グラフ。
   * `mostPopular`しか指定できず、指定すると、`regionCode`で指定した地域 or `videoCategoryId`で指定した動画カテゴリ内部で、最も人気の動画を返却する。
   */
  chart?: "mostPopular";
  /**
   * 国コードを指定する。`chart`とセットで使用。
   * 国コードの指定方法は[ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html)形式。
   * 例: `JP`/`US`/`CN`/`KR`
   */
  regionCode?: string;
  /**
   * 動画カテゴリIDを指定する、`chart`とセットで使用。
   */
  videoCategoryId?: string;
  /**
   * 認証ユーザーの高評価動画/低評価動画をターゲットに絞り込む。
   * OAuth認証時のリクエストのみ有効。
   * - `like`: 高評価動画のみを返却
   * - `dislike`: 低評価動画のみを返却
   */
  myRating?: "like" | "dislike";
  /**
   * 1回のリクエストで取得できるチャンネル数を指定できる。
   * 0〜50まで指定可能、デフォルト値: `5`
   */
  maxResults?: number;
  /**
   * paging機能を使う場合に使用。
   */
  pageToken?: string;
  /**
   * OAuth認証時のリクエストのみ有効。
   * Youtubeコンテンツパートナー専用プロパティ。
   * 詳しくは公式Docs参照。
   */
  onBehalfOfContentOwner?: string;
}