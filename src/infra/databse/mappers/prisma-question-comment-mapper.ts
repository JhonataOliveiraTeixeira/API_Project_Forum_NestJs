/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Comment as PrismaQuestionComment, Prisma } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(prismaQuestionComment: PrismaQuestionComment) {
    if (!prismaQuestionComment.originQuestionId) {
      throw new Error('Invalid comment type.')
    }
    return QuestionComment.create(
      {
        content: prismaQuestionComment.content,
        authorId: new UniqueEntityID(prismaQuestionComment.authorId),
        questionId: new UniqueEntityID(prismaQuestionComment.originQuestionId),
        createAt: prismaQuestionComment.createdAt,
        updateAt: prismaQuestionComment.updatedAt,
      },
      new UniqueEntityID(prismaQuestionComment.id),
    )
  }

  static toPrisma(questionComment: QuestionComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      originQuestionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createAt,
      updatedAt: questionComment.updateAt,
    }
  }
}
