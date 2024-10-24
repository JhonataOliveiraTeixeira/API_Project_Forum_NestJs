import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionAttachmentRepository } from '../../repositories/question-attachment-repository'

export class InMemoryQuestionRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepositooty: QuestionAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      throw new Error('Question not found')
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return question
  }

  async findManyRecent({ page }: PaginationParms) {
    const questions = this.items
      .sort((a, b) => b.createAt.getTime() - a.createAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
    this.questionAttachmentRepositooty.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question
  }
}
