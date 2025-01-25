import { VideoCategoriesRequest } from '~/client'
import { InputVideoCategoriesRequest } from '~/input-types'

/**
 * Adapter class for VideoCategoriesRequest
 */
export class VideoCategoriesRequestAdapter {
  private params: InputVideoCategoriesRequest

  constructor(params: InputVideoCategoriesRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * TODO: Implement this method
   * @param params
   */
  private validate(params: InputVideoCategoriesRequest): void {
    if (!params.part || params.part.length === 0) {
      throw new Error('part is required and cannot be empty.')
    }
  }

  toParams(): VideoCategoriesRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
