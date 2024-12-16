import {
  IBasePageInfoResponse,
  IBaseResponse,
  IBaseThumbnail,
} from "~/types/IBaseResponse";

/**
 * Youtube Data API > `activities`のレスポンス。
 * 公式Docs: https://developers.google.com/youtube/v3/docs/activities/list?hl=ja
 */
export interface IActivitiesResponse
  extends IBaseResponse,
    IBasePageInfoResponse {
  /**
   * 結果は配列形式で格納される。
   */
  items: {
    kind: string;
    etag: string;
    id: string;
    /**
     * アクティビティの基本情報。
     */
    snippet: IActivitiesResponse_Snippet;
    /**
     * アクティビティ対象のコンテンツ情報。
     * 例: `snippet.type`が`videoRated`である場合、当情報は評価された動画情報を指す。
     */
    contentDetails: IActivitiesResponse_ContentDetail;
  }[];
}

/**
 * Youtube Data API > `activities`の`snippet`partのデータ型。
 */
export interface IActivitiesResponse_Snippet {
  /**
   * アクティビティ発生日時。
   * ISO 8601(`YYYY-MM-DDThh:mm:ss.sZ`)形式で返却。
   */
  publishedAt: string;
  /**
   * アクティビティ種別。以下が指定される:
   * - `bulletin`: お知らせメッセージ
   * - `channelItem`: チャンネルへリソース追加
   * - `comment`: 動画orチャンネルへコメントを行った
   * - `favorite`: 動画をお気に入りにした
   * - `like`: 高評価を押した
   * - `playlistItem`: 再生リストに追加した
   * - `recommendation`: 動画等のリソースをお勧めされた
   * - `social`: SNSヘ投稿
   * - `subscription`: チャンネル登録した
   * - `upload`: 動画アップロード
   */
  type: string;
  /**
   * アクティビティが発生したチャンネルID。
   */
  channelId: string;
  /**
   * アクティビティが発生したチャンネルのタイトル。
   */
  channelTitle: string;
  /**
   * アクティビティに紐づくリソース(動画など)のタイトル。
   */
  title: string;
  /**
   * アクティビティに紐づくリソース(動画など)の説明。
   */
  description: string;
  thumbnails: IBaseThumbnail;
  /**
   * アクティビティに紐づくグループID。以下公式Docs原文ママ:
   * グループ ID は、同じユーザーとリソースに関連付けられているユーザー イベントを特定します。たとえばユーザーが動画を評価し、その動画をお気に入りにした場合、そのユーザーのアクティビティ フィードではこれらのイベントのグループ ID は同じになります。ユーザー インターフェースでは、同じ groupId 値でイベントをグループ化することによって、繰り返しを避けることができます。
   */
  groupId: string;
}

/**
 * Youtube Data API > `activities`の`contentDetails`partのデータ型。
 */
export interface IActivitiesResponse_ContentDetail {
  /**
   * アップロード済み動画の情報。
   * `snippet.type`が`upload`の場合格納される。
   */
  upload: {
    /**
     * Youtube動画ID。
     */
    videoId: string;
  };
  /**
   * 高評価対象の情報。
   * `snippet.type`が`like`の場合格納される。
   */
  like: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
    };
  };
  /**
   * 高評価対象の情報。
   * `snippet.type`が`favorite`の場合格納される。
   */
  favorite: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 高評価対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
    };
  };
  /**
   * コメント対象の情報。
   * `snippet.type`が`comment`の場合格納される。
   */
  comment: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
      /**
       * 対象のチャンネルID。
       * `resourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
    };
  };
  /**
   * サブスクリプションした対象チャンネルの情報。
   * `snippet.type`が`subscription`の場合格納される。
   */
  subscription: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象のチャンネルID。
       * `resourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
    };
  };
  /**
   * 再生リスト追加対象の情報。
   * `snippet.type`が`playlistItem`の場合格納される。
   */
  playlistItem: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
    };
    /**
     * 追加対象の再生リストID。
     */
    playlistId: string;
    /**
     * 追加対象の再生リストアイテムID。
     */
    playlistItemId: string;
  };
  /**
   * 再生リスト追加対象の情報。
   * `snippet.type`が`recommendation`の場合格納される。
   */
  recommendation: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
      /**
       * 対象のチャンネルID。
       * `resourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
    };
    /**
     * そのリソースがお勧めされた理由。以下が指定される:
     * - `unspecified`
     * - `videoFavorited`
     * - `videoLiked`
     * - `videoWatched`
     */
    reason: "unspecified" | "videoFavorited" | "videoLiked" | "videoWatched";
    /**
     * お勧め発生元のリソース情報。
     */
    seedResourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `seedResourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
      /**
       * 対象のチャンネルID。
       * `seedResourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
      /**
       * 対象の動画ID。
       * `seedResourceId.kind`が`youtube#playlist`の場合のみ格納。
       */
      playlistId: string;
    };
  };
  /**
   * お知らせメッセージ対象の情報。
   * `snippet.type`が`bulletin`の場合格納される。
   */
  bulletin: {
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
      /**
       * 対象のチャンネルID。
       * `resourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#playlist`の場合のみ格納。
       */
      playlistId: string;
    };
    /**
     * 追加対象の再生リストID。
     */
    playlistId: string;
    /**
     * 追加対象の再生リストアイテムID。
     */
    playlistItemId: string;
  };
  /**
   * SNSメッセージ投稿対象の情報。
   * `snippet.type`が`social`の場合格納される。
   */
  social: {
    /**
     * SNSの種別。
     */
    type: "facebook" | "googlePlus" | "twitter" | "unspecified";
    /**
     * SNSメッセージ投稿に関連づけられているリソース情報。
     */
    resourceId: {
      /**
       * リソース種別。
       */
      kind: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#video`の場合のみ格納。
       */
      videoId: string;
      /**
       * 対象のチャンネルID。
       * `resourceId.kind`が`youtube#channel`の場合のみ格納。
       */
      channelId: string;
      /**
       * 対象の動画ID。
       * `resourceId.kind`が`youtube#playlist`の場合のみ格納。
       */
      playlistId: string;
    };
    /**
     * SNS投稿作成者。
     */
    author: string;
    /**
     * SNS投稿作成者画像。
     */
    imageUrl: string;
    /**
     * SNS投稿URL。
     */
    referenceUrl: string;
  };
  /**
   * チャンネルへリソースを追加した際の追加対象リソース情報。
   * `snippet.type`が`channelItem`の場合格納される。
   */
  channelItem: {
    /**
     * リソース情報が格納。
     * 2023/05/28現在、公式Docsに詳細説明がないためany型で定義。
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resourceId: any;
  };
}