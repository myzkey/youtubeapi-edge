import { describe, it, expect } from 'vitest'
import { CommentThreadsRequestAdapter } from './index'
import { InputCommentThreadsRequest } from '~/input-types/input-comment-threads-request'

describe('CommentThreadsRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputCommentThreadsRequest
    expect(() => new CommentThreadsRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = {
      part: ['snippet'],
      maxResults: -1,
    } as InputCommentThreadsRequest
    expect(() => new CommentThreadsRequestAdapter(params)).toThrowError(
      'maxResults must be between 1 and 100.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputCommentThreadsRequest
    const adapter = new CommentThreadsRequestAdapter(params)
    expect(adapter).toBeInstanceOf(CommentThreadsRequestAdapter)
  })

  it('should convert InputCommentThreadsRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputCommentThreadsRequest
    const adapter = new CommentThreadsRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
