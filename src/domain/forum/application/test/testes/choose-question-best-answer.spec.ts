import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryQuestionRepository } from '../repositories/in-memory-question-repository'
import { makeQuestion } from '../factories/make-question'
import { InMemoryAnswerRepository } from '../repositories/in-memory-answer-repository'
import { ChooseQuestionBestAnswerUseCase } from '../../use-cases/choose-question-best-answer/choose-question-best-answer'
import { makeAnswer } from '../factories/make-answer'

let inMomoryAnswerRepository: InMemoryAnswerRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMomoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMomoryAnswerRepository,
    )
  })

  it('should be able choose question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })
    await inMemoryQuestionRepository.create(newQuestion)
    await inMomoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id,
    )
  })

  it('should be not able choose question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })
    await inMemoryQuestionRepository.create(newQuestion)
    await inMomoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: '1',
        answerId: newQuestion.authorId.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
