import { ChannelsRequest } from '~/client'
import { InputChannelsRequest } from '~/input-types/input-channel-request'

/**
 * Adapter class for ChannelsRequest
 */
export class ChannelsRequestAdapter {
  private params: InputChannelsRequest

  constructor(params: InputChannelsRequest) {
    this.validate(params)
    this.params = params
  }

  /**
   * Validate the input parameters
   * @param params
   */
  private validate(params: InputChannelsRequest): void {
    if (!params.part || params.part.length === 0) {
      throw new Error('part is required and cannot be empty.')
    }
    if (
      params.maxResults &&
      (params.maxResults < 0 || params.maxResults > 50)
    ) {
      throw new Error('maxResults must be between 0 and 50.')
    }
    if (params.categoryId) {
      console.info('categoryId is deprecated.')
    }
  }

  toParams(): ChannelsRequest {
    return {
      ...this.params,
      part: this.params.part.join(','),
    }
  }
}
