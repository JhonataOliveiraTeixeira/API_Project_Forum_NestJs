/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Prisma, Attachment as PrismaQuestionAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(prismaQuestionAttachment: PrismaQuestionAttachment) {
    if (!prismaQuestionAttachment.originQuestionId) {
      throw new Error('Invalid attachment type.')
    }
    return QuestionAttachment.create(
      {
        questionId: new UniqueEntityID(prismaQuestionAttachment.originQuestionId),
        attachmentId: new UniqueEntityID(prismaQuestionAttachment.id),
      },
      new UniqueEntityID(prismaQuestionAttachment.id),
    )
  }

  static toPrismaUpdateMany(
    attachemnts: QuestionAttachment[]
  ): Prisma.AttachmentUpdateManyArgs {

    const attachemntsId = attachemnts.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: {
        id: {
          in: attachemntsId,
        },
      },
      data: {
        originQuestionId: attachemnts[0].questionId.toString(),
      },
    }

  }
}
