/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Prisma, Attachment as PrismaAnswerAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(prismaAnswerAttachment: PrismaAnswerAttachment) {
    if (!prismaAnswerAttachment.orginAnswerId) {
      throw new Error('Invalid attachment type.')
    }
    return AnswerAttachment.create(
      {
        answerId: new UniqueEntityID(prismaAnswerAttachment.orginAnswerId),
        attachmentId: new UniqueEntityID(prismaAnswerAttachment.id),
      },
      new UniqueEntityID(prismaAnswerAttachment.id),
    )
  }

  static toPrismaUpdateMany(
    attachemnts: AnswerAttachment[]
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
        orginAnswerId: attachemnts[0].answerId.toString(),
      },
    }

  }
}
