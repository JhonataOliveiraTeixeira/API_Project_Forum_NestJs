import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerAttachmentMapper } from '../../mappers/prisma-answer-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachemnts: AnswerAttachment[]): Promise<void> {
    if (attachemnts.length === 0) {
      return
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachemnts)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachemnts: AnswerAttachment[]): Promise<void> {
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

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        orginAnswerId: answerId,
      },
    })
    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        orginAnswerId: answerId,
      },
    })
  }
}
