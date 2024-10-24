import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { EditAnswerUseCase } from '../../use-cases/edit-answer/edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { InMemoryAnswerAttachmentRepository } from '../repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from '../factories/make-answer-attachment'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      (inMemoryAnswerAttachmentRepository =
        new InMemoryAnswerAttachmentRepository()),
    )

    sut = new EditAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerAttachmentRepository,
    )
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answer-1'),
    )
    inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      answerId: 'answer-1',
      authorId: '1',
      content: 'Nova resposta',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Nova resposta',
    })
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should be not able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('answer-1'),
    )
    inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: '2',
      content: 'Nova resposta',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
