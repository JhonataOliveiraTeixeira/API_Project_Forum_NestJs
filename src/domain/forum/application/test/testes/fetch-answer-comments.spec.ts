import { expect, describe, beforeEach, it } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from '../repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from '../factories/make-answer-comment'
import { FetchAnswerCommentsUseCase } from '../../use-cases/fetch-answer-cooments/fetch-answer-comments'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )

    const result = await sut.execute({
      answerId: '1',
      page: 1,
    })

    expect(result.value?.answersComments).toHaveLength(3)
  })

  it('should be able to fetch pagination to recent answers', async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('32') }),
      )
    }

    const result = await sut.execute({
      answerId: '32',
      page: 2,
    })

    expect(result.value?.answersComments).toHaveLength(1)
  })
})
