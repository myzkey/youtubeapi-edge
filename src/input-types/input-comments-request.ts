/**
 * https://developers.google.com/youtube/v3/docs/comments?hl=ja
 */

type CommentsPart = 'id' | 'snippet'

export type InputCommentsRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   */
  part: CommentsPart[]
  /**
   * id パラメータには、取得するリソースのコメント スレッド ID のカンマ区切りのリストを指定します。
   */
  id?: string
  /**
   * parentId パラメータは、返信を取得するコメントの ID を指定します。
   */
  parentId?: string
  /**
   * maxResults パラメータは、結果セットで返されるアイテムの最大数を指定します。
   */
  maxResults?: number
  /**
   * paging機能を使う場合に使用。
   */
  pageToken?: string
  /**
   * ユーザーが追加したコメントを HTML 形式または書式なしテキストで返すように API に指示するには、このパラメータの値を html または plainText に設定します。デフォルト値は html です。
   */
  textFormat?: 'plainText' | 'html'
}
