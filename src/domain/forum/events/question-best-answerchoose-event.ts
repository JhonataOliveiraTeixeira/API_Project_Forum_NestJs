import { DomainEvents } from '@/core/events/domain-events'
import { Question } from '../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class QuestionBestAnswerChosenEvent implements DomainEvents {
  public ocurredAt: Date
  public question: Question
  public bastAnswerId: UniqueEntityID

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question
    this.bastAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}
