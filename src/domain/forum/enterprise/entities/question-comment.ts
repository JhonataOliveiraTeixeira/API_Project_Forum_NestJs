import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Comment, Commentprops } from './comment'

export interface QuestionCommentprops extends Commentprops {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentprops> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentprops, 'createAt'>,
    id?: UniqueEntityID,
  ) {
    const questioncomment = new QuestionComment(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
      },
      id,
    )

    return questioncomment
  }
}
