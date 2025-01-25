import { BaseResponse } from '~/client/types/base-response'

/**
 * https://developers.google.com/youtube/v3/docs/videoCategories/list?hl=ja
 */
export type VideoCategoriesResponse = BaseResponse & {
  items: {
    id: string
    kind: string
    etag: string
    snippet: VideoCategoriesResponseSnippet
  }[]
}

type VideoCategoriesResponseSnippet = {
  channelId: string
  title: string
  assignable: boolean
}
