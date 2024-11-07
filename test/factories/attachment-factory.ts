import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { PrismaAttachmentMapper } from '@/infra/databse/mappers/prisma-attachmetn-mapper'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      link: faker.lorem.slug(),
      ...override,
    },
    id,
  )
  return attachment
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)
    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    })
    return attachment
  }
}
