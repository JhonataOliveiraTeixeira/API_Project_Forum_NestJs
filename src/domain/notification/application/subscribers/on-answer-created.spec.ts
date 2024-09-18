/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from '@/domain/forum/application/test/factories/make-answer'
import { OnAnswerCreaed } from './on-answer-created'
import { InMemoryAnswerRepository } from '@/domain/forum/application/test/repositories/in-memory-answer-repository'
import { describe, it, beforeEach, MockInstance, vi, expect } from 'vitest'
import { InMemoryAnswerAttachmentRepository } from '@/domain/forum/application/test/repositories/in-memory-answer-attachment-repository'
import { InMemoryQuestionRepository } from '@/domain/forum/application/test/repositories/in-memory-question-repository'
import { InMemoryQuestionAttachmentRepository } from '@/domain/forum/application/test/repositories/in-memory-question-attachment-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification'
import { NoitificationRepository } from '../repositories/notification-repository'
import { makeQuestion } from '@/domain/forum/application/test/factories/make-question'
import { waitFor } from '../test/utils/wait-for'

let inMeoryQuestionAtachametRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionrepository: InMemoryQuestionRepository
let inMemorAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let notificationrepository: NoitificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendnOtificationExacuteSpy: MockInstance

describe('On answer Created', () => {
  beforeEach(() => {
    notificationrepository = {
      create: vi.fn(),
      findById: vi.fn(),
      save: vi.fn(),
    } as NoitificationRepository

    sendNotificationUseCase = new SendNotificationUseCase(
      notificationrepository,
    )
    inMeoryQuestionAtachametRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionrepository = new InMemoryQuestionRepository(
      inMeoryQuestionAtachametRepository,
    )
    inMemorAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemorAnswerAttachmentRepository,
    )

    sendnOtificationExacuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreaed(inMemoryQuestionrepository, sendNotificationUseCase)
  })

  it('should send notification when an answer is created', async () => {
    const qustion = makeQuestion()
    const answer = makeAnswer({ questionId: qustion.id })

    inMemoryQuestionrepository.create(qustion)
    inMemoryAnswerRepository.create(answer)

    await waitFor(() => {
      expect(sendnOtificationExacuteSpy).toHaveBeenCalled()
    })
  })
})
