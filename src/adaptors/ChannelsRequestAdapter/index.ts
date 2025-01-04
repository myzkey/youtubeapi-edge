import { ChannelsRequest } from '~/client'
import { InputChannelsRequest } from '~/inputTypes/InputChannelRequest'

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
   * TODO: Implement this method
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private validate(_params: InputChannelsRequest): void {
    // if (!params.part || params.part.length === 0) {
    //   throw new Error('part is required and cannot be empty.')
    // }
  }

  toParams(): ChannelsRequest {
    return {
      ...this.params,
    }
  }
}
