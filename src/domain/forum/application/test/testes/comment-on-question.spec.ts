import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { InMemoryQuestionCommentRepository } from '../repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from '../../use-cases/comment-on-question/comment-on-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentRepository } from '../repositories/in-memory-question-attachment-repository'

let inMemoryQuestionCommentRepositoy: InMemoryQuestionCommentRepository
let inMemoryQuestionAttachmentRepositoy: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepositoy = new InMemoryQuestionCommentRepository()
    inMemoryQuestionAttachmentRepositoy =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepositoy,
    )
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepositoy,
    )
  })

  it('should be able comment on question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('1'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: 'IaIaOO',
    })

    expect(inMemoryQuestionCommentRepositoy.items[0].content).toEqual('IaIaOO')
  })
})
