/**
 * Youtube Data API videos request
 * https://developers.google.com/youtube/v3/docs/videos/list
 */

export type VideoPart =
  | 'id'
  | 'snippet'
  | 'contentDetails'
  | 'status'
  | 'statistics'
  | 'player'
  | 'topicDetails'
  | 'recordingDetails'
  | 'liveStreamingDetails'
  | 'fileDetails'
  | 'processingDetails'
  | 'suggestions'
  | 'localizations'
  | 'paidProductPlacementDetails'

export type InputVideosRequest = {
  /**
   * see: https://developers.google.com/youtube/v3/docs/videos/list#parameters
   * The part parameter specifies a comma-separated list of one or more video resource properties that the API response will include.
   * If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title, description, tags, and categoryId properties. As such, if you set part=snippet, the API response will contain all of those properties.
   * The following list contains the part names that you can include in the parameter value:
   *
   * - id
   * - snippet
   * - contentDetails
   * - status
   * - statistics
   * - player
   * - topicDetails
   * - recordingDetails
   * - liveStreamingDetails
   * - fileDetails
   * - processingDetails
   * - suggestions
   * - localizations
   * - paidProductPlacementDetails
   * @example ['snippet', 'contentDetails']
   */
  part: VideoPart[]
  /**
   * The id parameter specifies a comma-separated list of the YouTube video ID(s) for the resource(s) that are being retrieved. In a video resource, the id property specifies the video's ID.
   */
  id?: string
  /**
   * The chart parameter identifies the chart that you want to retrieve.
   *
   * Acceptable values are:
   * mostPopular – Return the most popular videos for the specified content region and video category.
   */
  chart?: 'mostPopular'
  /**
   * The regionCode parameter instructs the API to select a video chart available in the specified region. This parameter can only be used in conjunction with the chart parameter. The parameter value is an ISO 3166-1 alpha-2 country code.
   * [ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html)
   * @example `JP`/`US`/`CN`/`KR`
   */
  regionCode?: string
  /**
   * The videoCategoryId parameter identifies the video category for which the chart should be retrieved. This parameter can only be used in conjunction with the chart parameter. By default, charts are not restricted to a particular category. The default value is 0.
   */
  videoCategoryId?: string
  /**
   * This parameter can only be used in a properly authorized request. Set this parameter's value to like or dislike to instruct the API to only return videos liked or disliked by the authenticated user.
   *
   * Acceptable values are:
   * dislike – Returns only videos disliked by the authenticated user.
   * like – Returns only video liked by the authenticated user.
   */
  myRating?: 'like' | 'dislike'
  /**
   * The hl parameter instructs the API to retrieve localized resource metadata for a specific application language that the YouTube website supports. The parameter value must be a language code included in the list returned by the i18nLanguages.list method.
   *
   * If localized resource details are available in that language, the resource's snippet.localized object will contain the localized values. However, if localized details are not available, the snippet.localized object will contain resource details in the resource's default language.
   */
  hl?: string
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set.
   * Note: This parameter is supported for use in conjunction with the myRating parameter, but it is not supported for use in conjunction with the id parameter. Acceptable values are 1 to 50, inclusive. The default value is 5.
   */
  maxResults?: number
  /**
   * The maxHeight parameter specifies the maximum height of the embedded player returned in the player.embedHtml property. You can use this parameter to specify that instead of the default dimensions, the embed code should use a height appropriate for your application layout. If the maxWidth parameter is also provided, the player may be shorter than the maxHeight in order to not violate the maximum width. Acceptable values are 72 to 8192, inclusive.
   */
  maxHeight?: number
  /**
   * The maxWidth parameter specifies the maximum width of the embedded player returned in the player.embedHtml property. You can use this parameter to specify that instead of the default dimensions, the embed code should use a width appropriate for your application layout.
   *
   * If the maxHeight parameter is also provided, the player may be narrower than maxWidth in order to not violate the maximum height. Acceptable values are 72 to 8192, inclusive.
   */
  maxWidth?: number
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   *
   * Note: This parameter is supported for use in conjunction with the myRating parameter, but it is not supported for use in conjunction with the id parameter.
   */
  pageToken?: string
  /**
   * This parameter can only be used in a properly authorized request. Note: This parameter is intended exclusively for YouTube content partners.
   * The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string
}
