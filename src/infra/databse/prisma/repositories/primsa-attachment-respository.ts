/* eslint-disable prettier/prettier */
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AttachmentRepository } from '@/domain/forum/application/repositories/attachment-repository'
import { PrismaAttachmentMapper } from '../../mappers/prisma-attachmetn-mapper'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaAnswerAttachmentMapper } from '../../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAttachmentRespository implements AttachmentRepository {
  constructor(private primsa: PrismaService) { }

  async createMany(attachemnts: AnswerAttachment[]): Promise<void> {
    if (attachemnts.length === 0) {
      return
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachemnts)

    await this.primsa.attachment.updateMany(data)
  }

  async deleteMany(attachemnts: AnswerAttachment[]): Promise<void> {
    if (attachemnts.length === 0) {
      return
    }

    const attachemntsId = attachemnts.map((attachment) => {
      return attachment.id.toString()
    })
    await this.primsa.attachment.deleteMany({
      where: {
        id: {
          in: attachemntsId,
        },
      },
    })
  }

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.primsa.attachment.create({
      data
    })
  }


}
