import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreatedEvent } from '@/domain/forum/events/answer-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification'
import { DomainEvents } from '@/core/events/domain-events'

export class OnAnswerCreaed implements EventHandler {
  constructor(
    private questionRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerMNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerMNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )
    if (question) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `Nova resposta em ${question.title.substring(0, 40).concat('...')}`,
        content: answer.excerpt,
      })
    }
  }
}
