import { QuestionAttachmentRepository } from '../../repositories/question-attachment-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async createMany(attachemnts: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachemnts)
  }

  w

  async deleteMany(attachemnts: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.items.filter((item) => {
      return !attachemnts.some((attachemnts) => attachemnts.equals(item))
    })

    this.items = questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachments
  }
}
