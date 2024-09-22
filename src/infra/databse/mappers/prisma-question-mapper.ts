/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion, Prisma} from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(prismaQuestion: PrismaQuestion) {
    return Question.create(
      {
        title: prismaQuestion.title,
        content: prismaQuestion.content,
        authorId: new UniqueEntityID(prismaQuestion.authorId),
        bestAnswerId: prismaQuestion.bestAnswerId ? new UniqueEntityID(prismaQuestion.bestAnswerId) : null,
        slug: Slug.create(prismaQuestion.slug),
        createAt: prismaQuestion.createdAt,
        updateAt: prismaQuestion.updatedAt,
      },
      new UniqueEntityID(prismaQuestion.id),
    )
  }

  static toPrisma(question:Question): Prisma.QuestionUncheckedCreateInput{
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      slug: question.slug.value,
      content: question.content,
      createdAt: question.createAt,
      updatedAt: question.updateAt
    }
  }
}
