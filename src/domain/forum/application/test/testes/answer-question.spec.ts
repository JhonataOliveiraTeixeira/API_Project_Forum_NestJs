import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from '../../use-cases/answer-question/answer-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from '../repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from '../factories/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      (inMemoryAnswerAttachmentsRepository =
        new InMemoryAnswerAttachmentRepository()),
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able create a answer', async () => {
    const answer = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta conteúdo',
      attachmentsIds: ['1', '2'],
    })
    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: answer.value?.answer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: answer.value?.answer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    expect(answer.value?.answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(
      answer.value?.answer.id,
    )
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
