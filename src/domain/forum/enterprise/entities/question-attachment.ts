import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionAttachmentprops {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}
export class QuestionAttachment extends Entity<QuestionAttachmentprops> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentprops, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
