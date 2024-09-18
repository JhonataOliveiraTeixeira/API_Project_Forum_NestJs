import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, Answerprops } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<Answerprops> = {},
  id?: UniqueEntityID,
) {
  const newAnswer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return newAnswer
}
