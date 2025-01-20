import { CommentThreadsRequest } from '~/client/comment-threads-api-client/types/comment-threads-request'
import { InputCommentThreadsRequest } from '~/input-types/input-comment-threads-request'

/**
 * Adapter class for CommentThreadsRequest
 */
export class CommentThreadsRequestAdapter {
  private params: InputCommentThreadsRequest

  constructor(params: InputCommentThreadsRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * TODO: Implement this method
   * @param params
   */
  private validate(params: InputCommentThreadsRequest): void {
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

  toParams(): CommentThreadsRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
