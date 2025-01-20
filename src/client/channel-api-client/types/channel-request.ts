/**
 * Youtube Data API channels request
 * Official Docs: https://developers.google.com/youtube/v3/docs/channels/list
 */

export type ChannelsRequest = {
  /**
   * Specifies the parts of the channel information to retrieve.
   * The following parts can be specified.
   * Multiple parts can be specified, separated by commas.
   * - `id`
   * - `snippet`: Basic information about the channel
   * - `brandingSettings`: Branding information of the channel
   * - `contentDetails`: Content details of the channel
   * - `statistics`: Statistical information about the channel
   * - `topicDetails`: Freebase topic information associated with the channel
   * - `status`: Privacy status information of the channel
   * - `localizations`: Localized metadata for the channel
   * - `contentOwnerDetails`: Details about the content owner of the channel
   * - `auditDetails`: Audit details about the channel
   * @example ['snippet', 'contentDetails']
   */
  part: string
  /**
   * @deprecated
   * This parameter has been deprecated. The categoryId parameter specified a YouTube guide category and could be used to request YouTube channels associated with that category.
   */
  categoryId?: string
  /**
   * The id parameter specifies a comma-separated list of the YouTube channel ID(s) for the resource(s) that are being retrieved. In a channel resource, the id property specifies the channel's YouTube channel ID.
   */
  id?: string
  /**
   * The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.
   */
  forUsername?: string
  /**
   * The forHandle parameter specifies a YouTube handle, thereby requesting the channel associated with that handle. The parameter value can be prepended with an @ symbol. For example, to retrieve the resource for the "Google for Developers" channel, set the forHandle parameter value to either GoogleDevelopers or @GoogleDevelopers.
   */
  forHandler?: string
  /**
   * This parameter can only be used in a properly authorized request.
   * Note: This parameter is intended exclusively for YouTube content partners.
   * Set this parameter's value to true to instruct the API to only return channels managed by the content owner that the onBehalfOfContentOwner parameter specifies. The user must be authenticated as a CMS account linked to the specified content owner and onBehalfOfContentOwner must be provided.
   */
  managedByMe?: boolean
  /**
   * This parameter can only be used in a properly authorized request. Set this parameter's value to true to instruct the API to only return channels owned by the authenticated user.
   */
  mine?: boolean
  /**
   * The hl parameter instructs the API to retrieve localized resource metadata for a specific application language that the YouTube website supports. The parameter value must be a language code included in the list returned by the i18nLanguages.list method.
   * If localized resource details are available in that language, the resource's snippet.localized object will contain the localized values. However, if localized details are not available, the snippet.localized object will contain resource details in the resource's default language.
   */
  hl?: string
  /**
   * The maxResults parameter specifies the maximum number of items that should be returned in the result set. Acceptable values are 0 to 50, inclusive. The default value is 5.
   * @default 5
   */
  maxResults?: number
  /**
   * This parameter can only be used in a properly authorized request.
   * Note: This parameter is intended exclusively for YouTube content partners.
   * The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string
  /**
   * The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string
}
