import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { DeleteAnswerUseCase } from '../../use-cases/delete-answer/delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { InMemoryAnswerAttachmentRepository } from '../repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from '../factories/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswernRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answern', () => {
  beforeEach(() => {
    inMemoryAnswernRepository = new InMemoryAnswerRepository(
      (inMemoryAnswerAttachmentsRepository =
        new InMemoryAnswerAttachmentRepository()),
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswernRepository)
  })

  it('should be able to delete a answern', async () => {
    const newAnswern = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answern-1'),
    )
    inMemoryAnswernRepository.create(newAnswern)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswern.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswern.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      answerId: 'answern-1',
      authorId: '1',
    })

    expect(inMemoryAnswernRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })

  it('should be not able to delete a answern from another user', async () => {
    const newAnswern = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answern-1'),
    )
    inMemoryAnswernRepository.create(newAnswern)

    const answer = await sut.execute({
      answerId: 'answern-1',
      authorId: '2',
    })

    expect(answer.isLeft()).toBe(true)
    expect(answer.value).instanceOf(NotAllowedError)
  })
})
