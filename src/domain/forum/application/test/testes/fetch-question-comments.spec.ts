import { expect, describe, beforeEach, it } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from '../../use-cases/fetch-question-comments/fetch-question-comments'
import { InMemoryQuestionCommentRepository } from '../repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from '../factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )

    const questionsComments = await sut.execute({
      questionId: '1',
      page: 1,
    })

    expect(questionsComments.value?.questionsComments).toHaveLength(3)
  })

  it('should be able to fetch pagination to recent answers', async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('32') }),
      )
    }

    const questionsComments = await sut.execute({
      questionId: '32',
      page: 2,
    })

    expect(questionsComments.value?.questionsComments).toHaveLength(1)
  })
})
