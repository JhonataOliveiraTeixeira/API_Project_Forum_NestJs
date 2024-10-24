import { expect, describe, beforeEach, it } from 'vitest'
import { DeleteCommentOnAnswerUseCase } from '../../use-cases/delete-answer-comment/delete-answer-comment'
import { makeAnswerComment } from '../factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from '../repositories/in-memory-answer-comment-repository'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'

let inMemoryAnswerCommentRepositoy: InMemoryAnswerCommentRepository
let sut: DeleteCommentOnAnswerUseCase

describe('Delete Comment Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepositoy = new InMemoryAnswerCommentRepository()
    sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentRepositoy)
  })

  it('should be able delete comment answer', async () => {
    const comment = makeAnswerComment()

    await inMemoryAnswerCommentRepositoy.create(comment)

    await sut.execute({
      answerCommentId: comment.id.toString(),
      authorId: comment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepositoy.items).toHaveLength(0)
  })

  it('should be not able delete another usercomment answer', async () => {
    const comment = makeAnswerComment({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryAnswerCommentRepositoy.create(comment)

    const result = await sut.execute({
      answerCommentId: comment.id.toString(),
      authorId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
