import {
  BasePageInfoResponse,
  BaseResponse,
  BaseThumbnail,
} from '~/client/types/base-response'

/**
 * Youtube Data API > `channels`のレスポンス。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/channels/list?hl=ja
 */
export type ChannelsResponse = BaseResponse &
  BasePageInfoResponse & {
    /**
     * 結果は配列形式で格納される。
     */
    items: {
      kind: string
      etag: string
      id: string
      /**
       * チャンネルの基本情報。
       */
      snippet?: ChannelsResponseSnippet
      /**
       * チャンネルのコンテンツ情報。
       */
      contentDetails?: ChannelsResponseContentDetail
      /**
       * チャンネルの統計情報。
       */
      statistics?: ChannelsResponseStatistic
      /**
       * チャンネルのプライバシーステータス情報。
       */
      status?: ChannelsResponseStatus
      /**
       * チャンネルに関連づけられているFreebaseのトピック情報。
       * Freebase: かつて存在していたオンラインデータベース、Googleに買収後公開された。
       */
      topicDetails?: ChannelsResponseTopicDetail
      /**
       * チャンネルのブランディング情報。
       */
      brandingSettings?: ChannelsResponseBrandingSetting
    }[]
  }

/**
 * Youtube Data API > `channels`の`snippet`partのデータ型。
 */
export type ChannelsResponseSnippet = {
  /**
   * チャンネルタイトル。
   */
  title: string
  /**
   * チャンネルの説明。
   */
  description: string
  /**
   * カスタムURL。
   * `https://youtube.com/[カスタムURL]`で該当チャンネルへアクセス可能。
   */
  customUrl: string
  /**
   * チャンネル作成日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string
  thumbnails: BaseThumbnail
  /**
   * チャンネルの国。
   */
  country: string

  defaultLanguage: string

  localized: {
    title: string
    description: string
  }
}

/**
 * Youtube Data API > `channels`の`contentDetails`partのデータ型。
 */
export type ChannelsResponseContentDetail = {
  /**
   * Youtube側で自動生成される?再生リストのID群。
   */
  relatedPlaylists: {
    /**
     * 「高く評価した動画」の再生リストID。
     * 非公開の場合は空文字が入る。
     */
    likes: string
    /**
     * 「アップロードした動画」の再生リストID。
     */
    uploads: string
  }
}

/**
 * Youtube Data API > `channels`の`statistics`partのデータ型。
 */
export type ChannelsResponseStatistic = {
  /**
   * チャンネルの総再生回数。
   */
  viewCount: string
  /**
   * チャンネル登録者数。
   */
  subscriberCount: string
  /**
   * チャンネル登録者数を公開しているかどうか。
   * `true`:公開している / `false`:公開していない
   */
  hiddenSubscriberCount: boolean
  /**
   * チャンネルへアップロードされた動画数。
   * ライブ配信もカウントされる。
   * 公開設定が「公開」のみがカウントされる。
   */
  videoCount: string
}

/**
 * Youtube Data API > `channels`の`topicDetails`partのデータ型。
 */
export type ChannelsResponseTopicDetail = {
  /**
   * FreebaseのトピックID。
   * Freebase APIを使ってトピックの情報を得れる様だが…。
   */
  topicIds: string[]
  /**
   * トピックのカテゴリ。
   */
  topicCategories: string[]
}

/**
 * Youtube Data API > `channels`の`status`partのデータ型。
 */
export type ChannelsResponseStatus = {
  /**
   * チャンネルのプライバシーステータス。
   * - `private`: 非公開
   * - `public`: 公開
   * - `unlisted`: 限定公開(多分)
   */
  privacyStatus: string
  /**
   * チャンネルへYouTubeユーザー名 or Google+アカウントが関連付けられている稼働かを示す。
   */
  isLinked: boolean
  /**
   * 謎値。
   * `longUploadsUnspecified`となっていることを確認。
   */
  longUploadsStatus: string
  /**
   * 子供向けチャンネルかどうか。
   */
  madeForKids: boolean
}

/**
 * Youtube Data API > `channels`の`brandingSettings`partのデータ型。
 */
export type ChannelsResponseBrandingSetting = {
  /**
   * チャンネルページのブランディング情報。
   */
  channel: {
    /**
     * チャンネルタイトル。
     * タイトルの文字数は全角15文字（半角30文字）以内。
     */
    title: string
    /**
     * チャンネル説明。
     */
    description: string
    /**
     * チャンネルに設定されているキーワード。
     * 未設定だとプロパティごと無くなる。
     */
    keywords: string
    /**
     * 視聴者がチャンネルページに遷移した時、デフォルトで遷移するタブ名。
     * 未設定だとプロパティごと無くなる。
     */
    defaultTab: string
    /**
     * チャンネルへのトラフィック追跡/測定用のGoogleAnalyticsアカウントID。
     * 未設定だとプロパティごと無くなる。
     */
    trackingAnalyticsAccountId: string
    /**
     * チャンネル登録していない視聴者に対して、おすすめ動画で再生する動画ID。
     */
    unsubscribedTrailer: string
    /**
     * チャンネルの国。
     */
    country: string
  }
  image: {
    /**
     * チャンネルに合わせてさまざまなサイズのバナー画像を生成するために YouTube が使用するバナー画像の場所を指定。(?)
     * ※詳しくはDocs参照。
     */
    bannerExternalUrl: string
  }
}
