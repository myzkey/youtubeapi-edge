import { CommentsRequest } from '~/client/comments-api-client/types/comments-request'
import { InputCommentsRequest } from '~/input-types'

/**
 * Adapter class for CommentsRequest
 */
export class CommentsRequestAdapter {
  private params: InputCommentsRequest

  constructor(params: InputCommentsRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * TODO: Implement this method
   * @param params
   */
  private validate(params: InputCommentsRequest): void {
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

  toParams(): CommentsRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
