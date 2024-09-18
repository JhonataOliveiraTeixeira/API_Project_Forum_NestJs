import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionCommentRepository } from '../repositories/in-memory-question-comment-repository'
import { DeleteCommentOnQuestionUseCase } from '../../use-cases/delete-question-comment/delete-question-comment'
import { makeQuestionComment } from '../factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'

let inMemoryQuestionCommentRepositoy: InMemoryQuestionCommentRepository
let sut: DeleteCommentOnQuestionUseCase

describe('Delete Comment Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepositoy = new InMemoryQuestionCommentRepository()
    sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentRepositoy)
  })

  it('should be able delete comment question', async () => {
    const comment = makeQuestionComment()

    await inMemoryQuestionCommentRepositoy.create(comment)

    console.log(comment.authorId.toString())

    await sut.execute({
      questionCommentId: comment.id.toString(),
      authorId: comment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepositoy.items).toHaveLength(0)
  })

  it('should be not able delete another usercomment question', async () => {
    const comment = makeQuestionComment({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryQuestionCommentRepositoy.create(comment)

    const question = await sut.execute({
      questionCommentId: comment.id.toString(),
      authorId: '2',
    })

    expect(question.isLeft()).toBe(true)
    expect(question.value).instanceOf(NotAllowedError)
  })
})
