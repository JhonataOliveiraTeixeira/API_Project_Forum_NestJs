import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentprops {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}
export class AnswerAttachment extends Entity<AnswerAttachmentprops> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentprops, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id)

    return attachment
  }
}
