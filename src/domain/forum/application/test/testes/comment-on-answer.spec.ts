import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { makeAnswer } from '../factories/make-answer'
import { InMemoryAnswerCommentRepository } from '../repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from '../../use-cases/comment-on-answer/comment-on-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from '../repositories/in-memory-answer-attachment-repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerCommentRepositoy: InMemoryAnswerCommentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepositoy = new InMemoryAnswerCommentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      (inMemoryAnswerAttachmentsRepository =
        new InMemoryAnswerAttachmentRepository()),
    )
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepositoy,
    )
  })

  it('should be able comment on answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'IaIaOO',
    })

    expect(inMemoryAnswerCommentRepositoy.items[0].content).toEqual('IaIaOO')
  })
})
