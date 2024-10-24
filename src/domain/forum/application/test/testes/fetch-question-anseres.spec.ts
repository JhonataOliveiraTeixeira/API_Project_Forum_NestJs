import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { FecthQuestionAnswersUseCase } from '../../use-cases/fetch-question-answer/fetch-question-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from '../repositories/in-memory-answer-attachment-repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FecthQuestionAnswersUseCase

describe('Fetch recent Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      (inMemoryAnswerAttachmentRepository =
        new InMemoryAnswerAttachmentRepository()),
    )
    sut = new FecthQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch recente answers', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('12') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('12') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('12') }),
    )

    const answers = await sut.execute({
      questionId: '12',
      page: 1,
    })

    expect(answers.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch pagination to recent answers', async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('32') }),
      )
    }

    const answers = await sut.execute({
      questionId: '32',
      page: 2,
    })

    expect(answers.value?.answers).toHaveLength(1)
  })
})
