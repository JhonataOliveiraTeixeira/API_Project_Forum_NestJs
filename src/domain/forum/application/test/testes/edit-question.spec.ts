import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { EditQuestionUseCase } from '../../use-cases/edit-question/edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from '../repositories/in-memory-question-attachment-repository'
import { makeQuestionAttachment } from '../factories/make-question-attachment'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inmemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      (inmemoryQuestionAttachmentRepository =
        new InMemoryQuestionAttachmentRepository()),
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inmemoryQuestionAttachmentRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('1'),
      },
      new UniqueEntityID('question-1'),
    )
    inMemoryQuestionRepository.create(newQuestion)

    inmemoryQuestionAttachmentRepository.items.push(
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
      content: 'Nova pergunta',
      title: 'Novo titulo',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      content: 'Nova pergunta',
      title: 'Novo titulo',
    })
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should be not able to edit a question from another user', async () => {
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
      content: 'Nova pergunta',
      title: 'Novo titulo',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).instanceOf(NotAllowedError)
  })
})
