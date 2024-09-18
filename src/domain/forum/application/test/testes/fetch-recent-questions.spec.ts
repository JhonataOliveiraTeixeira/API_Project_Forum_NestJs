import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { FetchRecenteQuestionUseCase } from '../../use-cases/fetch-recent-questions/fetch-recent-questions'
import { InMemoryQuestionAttachmentRepository } from '../repositories/in-memory-question-attachment-repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inmemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecenteQuestionUseCase

describe('Fetch recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      (inmemoryQuestionAttachmentRepository =
        new InMemoryQuestionAttachmentRepository()),
    )
    sut = new FetchRecenteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recente questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createAt: new Date(2022, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createAt: new Date(2022, 0, 18) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createAt: new Date(2022, 0, 23) }),
    )

    const question = await sut.execute({
      page: 1,
    })

    expect(question.value?.question).toEqual([
      expect.objectContaining({ createAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch pagination to recent questions', async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const question = await sut.execute({
      page: 2,
    })

    expect(question.value?.question).toHaveLength(1)
  })
})
