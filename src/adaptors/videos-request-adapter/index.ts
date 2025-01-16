import { VideosRequest } from '~/client'
import { InputVideosRequest } from '~/input-types/input-videos-request'

/**
 * Adapter class for VideosRequest
 */
export class VideosRequestAdapter {
  private params: InputVideosRequest

  constructor(params: InputVideosRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * TODO: Implement this method
   * @param params
   */
  private validate(params: InputVideosRequest): void {
    if (!params.part || params.part.length === 0) {
      throw new Error('part is required and cannot be empty.')
    }
    if (
      params.maxResults &&
      (params.maxResults < 0 || params.maxResults > 50)
    ) {
      throw new Error('maxResults must be between 0 and 50.')
    }
  }

  toParams(): VideosRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
