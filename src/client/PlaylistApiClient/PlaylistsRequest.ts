/**
 * Youtube Data API > `playlists`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/playlists/list?hl=ja
 *
 * 取得対象のチャンネルの選び方は大きく分けてつ:
 * - チャンネルIDを指定する方法(`channelId`)
 * - 再生リストIDを指定する方法(`id`)
 * - 認証ユーザーが所有するチャンネルのみにする(`mine`=`true`)
 */
export type PlaylistsRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   * - `id`
   * - `snippet`: 再生リストの基本情報
   * - `status`: 再生リストのステータス情報
   * - `contentDetails`: 再生リストのコンテンツ情報(動画数など)
   * - `player`: 再生リストの動画プレイヤー情報(埋め込みタグ情報など)
   */
  part: string
  /**
   * 取得対象のチャンネルID。
   * チャンネルIDはそのチャンネルのURLを見ればわかる:
   * `https://www.youtube.com/channel/[チャンネルID]`
   */
  channelId?: string
  /**
   * 取得対象の再生リストID。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   */
  id?: boolean
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
   * APIアクセスキー。
   */
  key: string
}
