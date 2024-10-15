/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(prismaAnswer: PrismaAnswer) {
    return Answer.create(
      {
        content: prismaAnswer.content,
        authorId: new UniqueEntityID(prismaAnswer.authorId),
        createAt: prismaAnswer.createdAt,
        updateAt: prismaAnswer.updatedAt,
        questionId: new UniqueEntityID(prismaAnswer.questionId)
      },
      new UniqueEntityID(prismaAnswer.id),
    )
  }

  static toPrisma(answer:Answer): Prisma.AnswerUncheckedCreateInput{
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
      createdAt: answer.createAt,
      updatedAt: answer.updateAt,
      questionId: answer.questionId.toString()
    }
  }
}
