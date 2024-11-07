import { makeAnswerAttachment } from '@/domain/forum/application/test/factories/make-answer-attachment'
import {
  AnswerAttachment,
  AnswerAttachmentprops,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentprops> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)
    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        orginAnswerId: answerAttachment.answerId.toString(),
      },
    })
    return answerAttachment
  }
}
