import { AnswerAttachmentRepository } from '../../repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachment[] = []

  async createMany(attachemnts: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachemnts)
  }

  w

  async deleteMany(attachemnts: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.items.filter((item) => {
      return !attachemnts.some((attachemnts) => attachemnts.equals(item))
    })

    this.items = answerAttachments
  }

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
