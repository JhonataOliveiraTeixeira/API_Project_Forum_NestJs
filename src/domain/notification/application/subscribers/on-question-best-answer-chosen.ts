import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification'
import { DomainEvents } from '@/core/events/domain-events'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/events/question-best-answerchoose-event'
import { AnswerRepository } from '@/domain/forum/application/repositories/answres-repository'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendBestAnswerNotifdication.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendBestAnswerNotifdication({
    question,
    bastAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bastAnswerId.toString())
    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida`,
        content: `Sua resposta em ${question.title.substring(0, 20)} foi escolhida pelo autor`,
      })
    }
  }
}
