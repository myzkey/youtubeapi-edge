import { describe, it, expect } from 'vitest'
import { CommentsRequestAdapter } from './index'
import { InputCommentsRequest } from '~/input-types'

describe('CommentsRequestAdapter', () => {
  it('should throw an error if part is missing', () => {
    const params = { part: [] } as InputCommentsRequest
    expect(() => new CommentsRequestAdapter(params)).toThrowError(
      'part is required and cannot be empty.',
    )
  })

  it('should throw an error if maxResults is out of the valid range', () => {
    const params = {
      part: ['snippet'],
      maxResults: -1,
    } as InputCommentsRequest
    expect(() => new CommentsRequestAdapter(params)).toThrowError(
      'maxResults must be between 1 and 100.',
    )
  })

  it('should create an instance if part is provided', () => {
    const params = { part: ['snippet'] } as InputCommentsRequest
    const adapter = new CommentsRequestAdapter(params)
    expect(adapter).toBeInstanceOf(CommentsRequestAdapter)
  })

  it('should convert InputCommentsRequest to ChannelsRequest', () => {
    const params = {
      part: ['snippet', 'contentDetails'],
    } as InputCommentsRequest
    const adapter = new CommentsRequestAdapter(params)
    const result = adapter.toParams()
    expect(result.part).toBe('snippet,contentDetails')
  })
})
