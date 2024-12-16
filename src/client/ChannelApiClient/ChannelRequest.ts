/**
 * Youtube Data API > `channels`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/channels/list?hl=ja
 *
 * 取得対象のチャンネルの選び方は大きく分けてつ:
 * - チャンネルIDを指定する方法(`id`)
 * - Youtubeガイドカテゴリを指定する方法(`categoryId`)
 * - Youtubeユーザー名を指定する方法(`forUsername`)
 */
export type ChannelsRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   * - `id`
   * - `snippet`: チャンネルの基本情報
   * - `brandingSettings`: チャンネルのブランディング情報
   * - `contentDetails`: チャンネルのコンテンツ情報
   * - `statistics`: チャンネルの統計情報
   * - `topicDetails`: チャンネルに関連づけられているFreebaseのトピック情報
   * - `status`: チャンネルのプライバシーステータス情報
   * - `invideoPromotion`: チャンネルのプロモーション情報(なぜかリクエストできなかった…APIトークン形式では取得不可能なのかも?)
   */
  part: string;
  /**
   * 取得対象のチャンネルID。
   * チャンネルIDはそのチャンネルのURLを見ればわかる:
   * `https://www.youtube.com/channel/[チャンネルID]`
   */
  id?: string;
  /**
   * 取得対象のYoutubeガイドカテゴリ、この形式ではそのカテゴリに属するチャンネルが取得できる。
   * Youtubeガイドカテゴリとは: Youtube側が割り当てるカテゴリ、ユーザー側では割り当て不可能。
   * 詳しくは[こちら](https://developers.google.com/youtube/v3/docs/guideCategories?hl=ja)
   */
  categoryId?: string;
  /**
   * 取得対象のYoutubeユーザー名。
   */
  forUsername?: string;
  /**
   * `true`にすると、認証されたユーザーが所有するチャンネルのみを返す様になる。
   * OAuth認証時のリクエストのみ有効。
   */
  mine?: boolean;
  /**
   * OAuth認証時のリクエストのみ有効。
   * Youtubeコンテンツパートナー専用プロパティ。
   * 詳しくは公式Docs参照。
   */
  onBehalfOfContentOwner?: string;
  /**
   * 1回のリクエストで取得できるチャンネル数を指定できる。
   * 0〜50まで指定可能、デフォルト値: `5`
   */
  maxResults?: number;
  /**
   * paging機能を使う場合に使用。
   */
  pageToken?: string;
}