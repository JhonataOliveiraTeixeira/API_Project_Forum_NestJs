import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentprops,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentprops> = {},
  id?: UniqueEntityID,
) {
  const newQuestionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return newQuestionAttachment
}
