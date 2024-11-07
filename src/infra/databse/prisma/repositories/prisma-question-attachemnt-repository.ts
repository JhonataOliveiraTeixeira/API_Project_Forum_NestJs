import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionAttachmentMapper } from '../../mappers/prisma-question-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  constructor(private prisma: PrismaService) {}
  async createMany(attachemnts: QuestionAttachment[]): Promise<void> {
    if (attachemnts.length === 0) {
      return
    }

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachemnts)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachemnts: QuestionAttachment[]): Promise<void> {
    if (attachemnts.length === 0) {
      return
    }

    const attachemntsId = attachemnts.map((attachment) => {
      return attachment.id.toString()
    })
    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachemntsId,
        },
      },
    })
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: {
        originQuestionId: questionId,
      },
    })
    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        originQuestionId: questionId,
      },
    })
  }
}
