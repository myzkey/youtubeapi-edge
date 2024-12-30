/**
 * Youtube Data API > `activities`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/activities/list?hl=ja
 *
 * 取得対象のチャンネルの選び方は大きく分けてつ:
 * - チャンネルIDを指定する方法(`channelId`)
 * - 認証ユーザーのHOMEページのアクティビティのみにする(`home`=`true`)
 * - 認証ユーザーが所有するチャンネルのみにする(`mine`=`true`)
 */
export type InputActivitiesRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   * - `id`
   * - `snippet`: チャンネルの基本情報
   * - `contentDetails`:
   */
  part: string
  /**
   * 取得対象のチャンネルID。
   * チャンネルIDはそのチャンネルのURLを見ればわかる:
   * `https://www.youtube.com/channel/[チャンネルID]`
   */
  channelId?: string
  /**
   * 認証ユーザーのHOMEページに表示されるアクティビティフィードを取得するかどうか。
   * OAuth認証時のリクエストのみ有効。
   */
  home?: boolean
  /**
   * `true`にすると、認証されたユーザーが所有するチャンネルのみを返す様になる。
   * OAuth認証時のリクエストのみ有効。
   */
  mine?: boolean
  /**
   * 1回のリクエストで取得できるチャンネル数を指定できる。
   * 0〜50まで指定可能、デフォルト値: `5`
   */
  maxResults?: number
  /**
   * paging機能を使う場合に使用。
   */
  pageToken?: string
  /**
   * アクティビティ取得期間対象を指定。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で指定。
   * - 日時を指定: その日時以降の全てのアクティビティを取得
   * - 日付のみ指定: その日に発生したアクティビティを取得
   */
  publishedAfter?: string
  /**
   * アクティビティ取得期間対象を指定。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で指定。
   * - 日時を指定: その日時以前の全てのアクティビティを取得
   * - 日付のみ指定: その日に発生したアクティビティが除外
   */
  publishedBefore?: string
  /**
   * 指定した国のみにフィルタリングする。
   * 国コードの指定方法は[ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html)形式。
   * 例: `JP`/`US`/`CN`/`KR`
   */
  regionCode?: string
}
