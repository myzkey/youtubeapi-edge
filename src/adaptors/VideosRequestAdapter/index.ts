import { VideosRequest } from '~/client'
import { InputVideosRequest } from '~/inputTypes/InputVideosRequest'

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
  }

  toParams(): VideosRequest {
    return {
      ...this.params,
      part: Array.isArray(this.params.part)
        ? this.params.part.join(',')
        : this.params.part,
    }
  }
}
