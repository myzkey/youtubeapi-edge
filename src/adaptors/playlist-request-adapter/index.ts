import { PlaylistsRequest } from '~/client'
import { InputPlaylistsRequest } from '~/input-types'

/**
 * Adapter class for PlaylistsRequest
 */
export class PlaylistsRequestAdapter {
  private params: InputPlaylistsRequest

  constructor(params: InputPlaylistsRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * @param params
   */
  private validate(params: InputPlaylistsRequest): void {
    if (!params.part || params.part.length === 0) {
      throw new Error('part is required and cannot be empty.')
    }
    if (
      params.maxResults &&
      (params.maxResults < 0 || params.maxResults > 51)
    ) {
      throw new Error('maxResults must be between 0 and 50.')
    }

    if (!params.channelId && !params.id && !params.mine) {
      throw new Error('channelId, id, or mine must be specified.')
    }
  }

  toParams(): PlaylistsRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
