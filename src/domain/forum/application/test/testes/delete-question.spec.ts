import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { DeleteQuestionUseCase } from '../../use-cases/delete-question/delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from '../repositories/in-memory-question-attachment-repository'
import { makeQuestionAttachment } from '../factories/make-question-attachment'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      (inMemoryQuestionAttachmentRepository =
        new InMemoryQuestionAttachmentRepository()),
    )

    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to delte a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    )
    inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      questionId: 'question-1',
      authorId: '1',
    })

    expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0)
  })

  it('should be not able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    )
    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
