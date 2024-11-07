import { expect, describe, beforeEach, it } from 'vitest'
import { InMemoryAttachmentRepository } from '../repositories/in-memory-attachments-repository'
import { UploadAndCreateAttachmentCase } from '../../use-cases/upload-and-create-attachment/upload-and-create-attachment'
import { FakeUploader } from 'test/uploader/fake-uploader'
import { AttachmentTypeError } from '../../errors/invalid-attachment-type'

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let uploader: FakeUploader
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: UploadAndCreateAttachmentCase

describe('Upload and create attchment', () => {
  beforeEach(() => {
    uploader = new FakeUploader()
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    sut = new UploadAndCreateAttachmentCase(
      inMemoryAttachmentRepository,
      uploader,
    )
  })

  it('should be able upload and create attachment', async () => {
    const attachment = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(attachment.isRight()).toBeTruthy()
    expect(attachment.value).toEqual({
      attachment: inMemoryAttachmentRepository.items[0],
    })
  })

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AttachmentTypeError)
  })
})
