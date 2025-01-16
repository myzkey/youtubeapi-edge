import { VideosRequest } from '~/client'
import { InputSearchRequest } from '~/input-types/input-search-request'

/**
 * Adapter class for SearchRequest
 */
export class SearchRequestAdapter {
  private params: InputSearchRequest

  constructor(params: InputSearchRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * TODO: Implement this method
   * @param params
   */
  private validate(params: InputSearchRequest): void {
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
