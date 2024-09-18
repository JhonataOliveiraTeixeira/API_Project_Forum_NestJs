import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentprops,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerCommentprops> = {},
  id?: UniqueEntityID,
) {
  const newQuestionComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestionComment
}
