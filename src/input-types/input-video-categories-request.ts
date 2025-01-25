/**
 * Youtube Data API > `search`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/commentThreads/list?hl=ja
 */

type VideoCategorySnippet = 'snippet'

export type InputVideoCategoriesRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   */
  part: VideoCategorySnippet[]
  /**
   * id パラメータには、取得するリソースの動画カテゴリ ID のカンマ区切りのリストを指定します。
   */
  id?: string
  /**
   * regionCode パラメータは、指定された国で利用可能な動画カテゴリのリストを返すように API に指示します。パラメータ値は ISO 3166-1 alpha-2 国コードです。
   */
  regionCode?: string
  /**
   * hl パラメータは、API レスポンスのテキスト値に使用する言語を指定します。デフォルト値は en_US です。
   */
  hl?: string
}
