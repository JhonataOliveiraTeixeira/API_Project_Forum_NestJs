import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { InMemoryQuestionCommentRepository } from '../repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from '../../use-cases/comment-on-question/comment-on-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentRepositoy: InMemoryQuestionCommentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepositoy = new InMemoryQuestionCommentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
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
