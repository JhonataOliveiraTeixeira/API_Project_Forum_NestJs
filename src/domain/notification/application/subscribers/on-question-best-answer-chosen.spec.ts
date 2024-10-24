/* eslint-disable no-new */

import { InMemoryAnswerAttachmentRepository } from '@/domain/forum/application/test/repositories/in-memory-answer-attachment-repository'
import { InMemoryQuestionAttachmentRepository } from '@/domain/forum/application/test/repositories/in-memory-question-attachment-repository'
import { InMemoryQuestionRepository } from '@/domain/forum/application/test/repositories/in-memory-question-repository'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification'
import { describe, it, beforeEach, MockInstance, vi, expect } from 'vitest'
import { InMemoryNotificationRepository } from '../test/repositories/in-memory-notification-repository'
import { InMemoryAnswerRepository } from '@/domain/forum/application/test/repositories/in-memory-answer-repository'
import { makeQuestion } from '@/domain/forum/application/test/factories/make-question'
import { makeAnswer } from '@/domain/forum/application/test/factories/make-answer'
import { waitFor } from '../test/utils/wait-for'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when topic has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)
    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
    console.log('AAAAAAAAAAAAAAAAA')
  })
})
