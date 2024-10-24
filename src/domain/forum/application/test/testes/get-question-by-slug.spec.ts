import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from '../../use-cases/get-question-by-slug/get-question-by-slug'
import { makeQuestion } from '../factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentRepository } from '../repositories/in-memory-question-attachment-repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inmemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      (inmemoryQuestionAttachmentRepository =
        new InMemoryQuestionAttachmentRepository()),
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toBeTruthy()
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
