import {
  IBasePageInfoResponse,
  IBaseResponse,
  IBaseThumbnail,
} from "~/types/IBaseResponse";

/**
 * Youtube Data API > `videos`のレスポンス。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/videos/list?hl=ja
 */
export interface IVideosResponse extends IBaseResponse, IBasePageInfoResponse {
  /**
   * 結果は配列形式で格納される。
   */
  items: {
    kind: string;
    etag: string;
    id: string;
    /**
     * 動画の基本情報。
     */
    snippet: IVideosResponse_Snippet;
    /**
     * 動画のコンテンツ情報。
     */
    contentDetails: IVideosResponse_ContentDetail;
    /**
     * 動画のアップロード、処理、プライバシーステータス情報。
     */
    status: IVideosResponse_Status;
    /**
     * 動画の統計情報。
     */
    statistics: IVideosResponse_Statistic;
    /**
     * 動画の埋め込み時に使用される設定。
     */
    player: IVideosResponse_Player;
    /**
     * 動画に関連づけられているFreebaseのトピック情報。
     * Freebase: かつて存在していたオンラインデータベース、Googleに買収後公開された。
     */
    topicDetails: IVideosResponse_TopicDetail;
    /**
     * 動画が録画された場所、日付、住所情報。
     */
    recordingDetails: IVideosResponse_RecordingDetails;
    /**
     * ライブ配信情報。
     */
    liveStreamingDetails: IVideosResponse_LiveStreamingDetails;
  }[];
}

export interface IVideosResponse_Snippet {
  /**
   * 動画投稿日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string;
  /**
   * 動画を投稿したチャンネルID。
   */
  channelId: string;
  /**
   * 動画を投稿したチャンネル名。
   */
  channelTitle: string;
  /**
   * 動画タイトル。
   */
  title: string;
  /**
   * 動画説明。
   */
  description: string;
  /**
   * サムネイル情報。
   */
  thumbnails: IBaseThumbnail;
  /**
   * 動画に関連づけられているタグ。
   */
  tags: string[];
  /**
   * 動画に関連づけられている動画カテゴリID。
   */
  categoryId: string;
  /**
   * ライブ配信ステータス。
   * - `live`: APIリクエスト時点でライブ配信中
   * - `upcoming`: ライブ配信予約されている動画であり、まだライブ配信されてない状態
   * - `none`: ライブ配信ではない動画orライブ配信終了済みの動画
   */
  liveBroadcastContent: "live" | "upcoming" | "none";
  /**
   * デフォルトの言語。
   * 例: `ja`
   */
  defaultLanguage: string;
  /**
   * デフォルトのオーディオ言語。
   * 例: `ja`
   */
  defaultAudioLanguage: string;
}

export interface IVideosResponse_ContentDetail {
  /**
   * 動画の長さ。 ISO8601に倣った`PT#M#S`形式。
   * 例: `PT15M51S`= 15分51秒の動画、ということ。
   */
  duration: string;
  /**
   * 動画が2D形式か3D形式かどうかを示す。
   * - `2d`: 2D形式
   */
  dimension: string;
  /**
   * 高解像度(HD)版がある動画か、標準画質版のみであるかどうか。
   * - `hd`: 高解像度版もある
   * - `sd`: 標準画質版のみ
   */
  definition: "hd" | "sd";
  /**
   * 動画にキャプションがついているかどうか。
   * `true`: ついている、`false`: ついていない
   */
  caption: "true" | "false";
  /**
   * YouTubeコンテンツパートナーにより申し立てが行われている動画であるかどうか。
   */
  licensedContent: boolean;
  /**
   * 国別に動画の視聴制限をかけてる場合、視聴制限情報が格納。
   * 未設定の場合プロパティごと無くなる。
   */
  regionRestriction: {
    /**
     * 動画を視聴許可している国コードリスト。
     * ここに入ってない国は視聴がブロックされる。
     * リストが空の場合、全ての国からの視聴がブロックされる。
     */
    allowed: string[];
    /**
     * 動画を視聴拒否している句にコードリスト。
     * ここに入ってない国は視聴できる。
     * リストが空の場合、全ての国で視聴可能。
     */
    blocked: string[];
  };
  /**
   * 動画のレーティング情報。
   * たくさんの種類があるため、日本のレーティング情報のみに省略。
   * 全部みたい場合は公式Docs参照。
   */
  contentRating: {
    /**
     * 映倫によるレーティング情報。
     * - eirinG: G
     * - eirinPg12: PG-12
     * - eirinR15plus: R15+
     * - eirinR18plus: R18+
     * - eirinUnrated
     */
    eirinRating:
      | "eirinG"
      | "eirinPg12"
      | "eirinR15plus"
      | "eirinR18plus"
      | "eirinUnrated";
    /**
     * Youtubeが年齢制限を示すために使用するレーティング。
     */
    ytRating: "ytAgeRestricted";
  };
  /**
   * 謎値。`rectangular`を確認。
   */
  projection: string;
}

export interface IVideosResponse_Status {
  /**
   * 動画のアップロードステータス。
   * - `deleted`: 削除済み
   * - `failed`: アップロード失敗
   * - `processed`: アップロード中
   * - `rejected`: アップロード却下
   * - `uploaded`: アップロード完了
   */
  uploadStatus: "deleted" | "failed" | "processed" | "rejected" | "uploaded";
  /**
   * アップロード失敗時の理由。
   * `uploadStatus`が`failed`の時のみ存在。
   * - `codec`
   * - `conversion`
   * - `emptyFile`
   * - `invalidFile`
   * - `tooSmall`
   * - `uploadAborted`
   */
  failureReason:
    | "codec"
    | "conversion"
    | "emptyFile"
    | "invalidFile"
    | "tooSmall"
    | "uploadAborted";
  /**
   * アップロードが却下された理由。
   * `uploadStatus`が`rejected`の時のみ存在。
   * - `claim`
   * - `copyright`
   * - `duplicate`
   * - `inappropriate`
   * - `length`
   * - `termsOfUse`
   * - `trademark`
   * - `uploaderAccountClosed`
   * - `uploaderAccountSuspended`
   */
  rejectionReason:
    | "claim"
    | "copyright"
    | "duplicate"
    | "inappropriate"
    | "length"
    | "termsOfUse"
    | "trademark"
    | "uploaderAccountClosed"
    | "uploaderAccountSuspended";
  /**
   * 動画のプライバシーステータス。
   * - `private`: 非公開
   * - `public`: 公開
   * - `unlisted`
   */
  privacyStatus: "private" | "public" | "unlisted";
  /**
   * 動画のライセンス。
   * - `creativeCommon`
   * - `youtube`
   */
  license: "creativeCommon" | "youtube";
  /**
   * 動画の埋め込みが可能かどうか。
   */
  embeddable: boolean;
  /**
   * 動画再生ページで拡張統計情報が一般公開されているかどうか。
   * デフォルト: 統計情報が表示。
   * `false`であっても、一部の統計情報(再生回数/評価など)は一般公開される。
   */
  publicStatsViewable: boolean;
  /**
   * 子供向け動画として設定されているかどうか。
   */
  madeForKids: boolean;
}

export interface IVideosResponse_Statistic {
  /**
   * 動画の視聴回数。
   */
  viewCount: string;
  /**
   * 動画の高評価数。
   */
  likeCount: string;
  /**
   * 動画の低評価数。
   */
  dislikeCount: string;
  /**
   *API取得時点の、動画がお気に入りされている数。
   */
  favoriteCount: string;
  /**
   * 動画に付いてるコメント数。
   */
  commentCount: string;
}

export interface IVideosResponse_Player {
  /**
   * 動画の埋め込み`<iframe>`タグ。
   */
  embedHtml: string;
}

export interface IVideosResponse_TopicDetail {
  /**
   * 動画に紐づく主要なFreebaseID群。
   * 動画を主として構成しているカテゴリが格納される。
   */
  topicCategories: string[];
  /**
   * 動画で取り上げられている可能性のあるFreebaseID群。
   */
  relevantTopicIds: string[];
}

export interface IVideosResponse_RecordingDetails {
  /**
   * 動画の録画場所の位置情報。
   */
  location: {
    /**
     * 緯度。
     */
    latitude: number;
    /**
     * 経度。
     */
    longitude: number;
    /**
     * 準拠楕円体からの高度(単位:メートル)。
     */
    altitude: number;
  };
  /**
   * 動画の録画日。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式。
   */
  recordingDate: string;
}

export interface IVideosResponse_LiveStreamingDetails {
  /**
   * ライブ配信開始時刻。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式。
   */
  actualStartTime: string;
  /**
   * ライブ配信終了時刻。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式。
   */
  actualEndTime: string;
  /**
   * ライブ配信開始予定時刻。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式。
   */
  scheduledStartTime: string;
}