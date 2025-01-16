/**
 * Youtube Data API > `search`のリクエスト。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/search/list?hl=ja
 */
export type InputSearchRequest = {
  /**
   * 情報取得対象箇所。
   * 以下の項目を指定可能。
   * 複数指定でき、カンマ区切りでリクエスト可能。
   * - `id`
   * - `snippet`: 動画の基本情報
   */
  part: ('id' | 'snippet')[]
  /**
   * 検索クエリ。
   */
  q?: string
  /**
   * 動画IDを指定し、指定した動画に関連のある動画のみを返却。
   * `true`にする場合、`type`を`video`にする必要あり。
   */
  relatedToVideoId?: string
  /**
   * 認証ユーザーの動画のみに絞り込む。
   * OAuth認証時のリクエストのみ有効。
   * `true`にする場合、`type`を`video`にする必要あり。
   */
  forMine?: boolean
  /**
   * `onBehalfOfContentOwner`で指定されたコンテンツ所有者のデータをターゲットに絞り込むかどうか。
   * OAuth認証時のリクエストのみ有効。
   */
  forContentOwner?: boolean
  /**
   * OAuth認証時のリクエストのみ有効。
   * Youtubeコンテンツパートナー専用プロパティ。
   * 詳しくは公式Docs参照。
   */
  onBehalfOfContentOwner?: string
  /**
   * 指定したチャンネルのみのデータにフィルタリングする。
   */
  channelId?: string
  /**
   * 指定したチャンネル種別のみのデータにフィルタリングする。
   * - `any`: 全てのチャンネル
   * - `show`: 番組のみ
   */
  channelType?: 'any' | 'show'
  /**
   * 動画の配信ステータスに応じてフィルタリングする。
   * - `completed`: 配信終了したもののみ
   * - `live`: 現在配信中のもののみ
   * - `upcoming`: 今後配信予定のもののみ
   */
  eventType?: 'completed' | 'live' | 'upcoming'
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
   * データの並び替え方法を指定。
   * - `date`: 作成日の新しい順
   * - `rating`: 評価の高い順
   * - `relevance`: 検索クエリの関連度が高い順
   * - `title`: タイトルのアルファベット順
   * - `videoCount`: 動画の番号順
   * - `viewCount`: 再生数の多い順
   */
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'
  /**
   * 期間対象を指定。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で指定。
   * - 日時を指定: その日時以降の全ての動画を取得
   * - 日付のみ指定: その日に発生した動画を取得
   */
  publishedAfter?: string
  /**
   * 期間対象を指定。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で指定。
   * - 日時を指定: その日時以前の全ての動画を取得
   * - 日付のみ指定: その日に発生した動画が除外
   */
  publishedBefore?: string
  /**
   * 指定した国で使用可能な動画のみにフィルタリングする。
   * 国コードの指定方法は[ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html)形式。
   * 例: `JP`/`US`/`CN`/`KR`
   */
  regionCode?: string
  /**
   * 検索結果に制限コンテンツも含めるかどうか。
   * - `moderate`: 一定のフィルタリングを行う(言語/地域での除外設定適用)、デフォルトのパラメータ
   * - `none`: フィルタリングを一切行わない
   * - `strict`: 制限コンテンツは全て除外
   */
  safeSearch?: 'moderate' | 'none' | 'strict'
  /**
   * 指定した動画カテゴリIDのみでフィルタリングされる様設定。
   */
  videoCategoryId?: string
  /**
   * 指定したFreebaseのトピックIDのみでフィルタリングされる様設定。
   */
  topicId?: string
  /**
   * 検索対象を指定。
   * - `video`: 動画
   * - `channel`: チャンネル
   * - `playlist`: 再生リスト
   */
  type?: 'video' | 'channel' | 'playlist'
  /**
   * 動画の解像度でフィルタリングする。
   * - `high`: HD動画のみ取得
   * - `standard`: SD(標準画質)動画のみ取得
   * - `any`: フィルタリングしない
   */
  videoDefinition?: 'high' | 'standard' | 'any'
  /**
   * 字幕の有無でフィルタリングする。
   * - `closedCaption`: 字幕がある動画のみを取得
   * - `none`: 字幕がない動画のみを取得
   * - `any`: フィルタリングしない
   */
  videoCaption?: 'closedCaption' | 'none' | 'any'
  /**
   * 2D/3D動画でフィルタリングする。
   * - `2d`: 2D動画のみを取得
   * - `3d`: 3D動画のみを取得
   * - `any`: フィルタリングしない
   */
  videoDimension?: '2d' | '3d' | 'any'
  /**
   * 動画の長さでフィルタリング。
   * - `short`: 4分未満の動画のみを取得
   * - `medium`: 4分〜20分の動画のみを取得
   * - `long`: 20分超えの動画のみを取得
   * - `any`: フィルタリングしない
   */
  videoDuration?: 'short' | 'medium' | 'long' | 'any'
  /**
   * 埋め込み可能な動画でフィルタリング。
   * - `true`: 埋め込み可能な動画のみを取得。
   * - `any`: フィルタリングしない
   */
  videoEmbeddable?: 'true' | 'any'
  /**
   * 動画のライセンス保持状態によってフィルタリング。
   * - `creativeCommon`: クリエイティブ・コモンズ ライセンスを持つ動画のみを取得
   * - `youtube`: 標準のYoutubeライセンスを持つ動画のみを取得
   * - `any`: フィルタリングしない
   */
  videoLicense?: 'creativeCommon' | 'youtube' | 'any'
  /**
   * Youtube.com以外でも再生できるかどうかでフィルタリング。
   * - `true`: youtube.com以外で再生できる動画のみ
   * - `any`: フィルタリングしない
   */
  videoSyndicated?: 'true' | 'any'
  /**
   * 動画種別でフィルタリング。
   * - `episode`: 番組のエピソードのみ
   * - `movie`: 動画のみ
   * - `any`: フィルタリングしない
   */
  videoType?: 'episode' | 'movie' | 'any'
}
