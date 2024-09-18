import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentprops,
} from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<QuestionCommentprops> = {},
  id?: UniqueEntityID,
) {
  const newQuestionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestionComment
}
