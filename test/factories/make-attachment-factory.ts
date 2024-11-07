import { makeQuestionAttachment } from '@/domain/forum/application/test/factories/make-question-attachment'
import {
  QuestionAttachment,
  QuestionAttachmentprops,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentprops> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data)
    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        originQuestionId: questionAttachment.questionId.toString(),
      },
    })
    return questionAttachment
  }
}
