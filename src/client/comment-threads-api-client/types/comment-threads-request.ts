/**
 * Youtube Data API > `search`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/commentThreads/list?hl=ja
 */

export type CommentThreadsRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   */
  part: string
  /**
   * id パラメータには、取得するリソースのコメント スレッド ID のカンマ区切りのリストを指定します。
   */
  id?: string
  /**
   * allThreadsRelatedToChannelId パラメータは、指定されたチャンネルに関連付けられているすべてのコメント スレッドを返すように API に指示します。
   */
  allThreadsRelatedToChannelId?: string
  /**
   * videoId パラメータは、指定された動画 ID に関連付けられたコメント スレッドを返すように API に指示します。
   */
  videoId?: string
  /**
   * maxResults パラメータは、結果セットで返されるアイテムの最大数を指定します。
   */
  maxResults?: number
  /**
   * paging機能を使う場合に使用。
   */
  pageToken?: string
  /**
   * このパラメータは、適切に承認されたリクエストでのみ使用できます。このパラメータを設定すると、返されるコメント スレッドを特定の管理状態に制限できます。
   */
  moderationStatus?: 'heldForReview' | 'published' | 'likelySpam'
  /**
   * データの並び替え方法を指定。
   */
  order?: 'time' | 'relevance'
  /**
   * searchTerms パラメータは、指定した検索キーワードを含むコメントのみが API レスポンスに含まれるように制限するよう API に指示します。
   */
  searchTerms?: string
  /**
   * ユーザーが追加したコメントを HTML 形式または書式なしテキストで返すように API に指示するには、このパラメータの値を html または plainText に設定します。デフォルト値は html です。
   */
  textFormat?: 'plainText' | 'html'
}
