import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { AttachmentTypeError } from '../../errors/invalid-attachment-type'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentRepository } from '../../repositories/attachment-repository'
import { Uploader } from '@/domain/forum/storage/uploader'

interface UploadAndCreateAttachmentCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentCaseResponse = Either<
  AttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentCaseRequest): Promise<UploadAndCreateAttachmentCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new AttachmentTypeError())
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      link: url,
    })

    await this.attachmentRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
