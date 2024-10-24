import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentprops,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentprops> = {},
  id?: UniqueEntityID,
) {
  const newAnswerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return newAnswerAttachment
}
