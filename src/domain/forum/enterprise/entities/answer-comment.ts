import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Comment, Commentprops } from './comment'

export interface AnswerCommentprops extends Commentprops {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentprops> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentprops, 'createAt'>,
    id?: UniqueEntityID,
  ) {
    const answercomment = new AnswerComment(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
      },
      id,
    )

    return answercomment
  }
}
