/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaAnswerComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(prismaAnswerComment: PrismaAnswerComment) {
    if(!prismaAnswerComment.orginAnswerId){
      throw new Error('Invalid comment type.')
    }
    return AnswerComment.create(
      {
        content: prismaAnswerComment.content,
        authorId: new UniqueEntityID(prismaAnswerComment.authorId),
        answerId: new UniqueEntityID(prismaAnswerComment.orginAnswerId),
        createAt: prismaAnswerComment.createdAt,
        updateAt: prismaAnswerComment.updatedAt,
      },
      new UniqueEntityID(prismaAnswerComment.id),
    )
  }

  static toPrisma(answerComment:AnswerComment): Prisma.CommentUncheckedCreateInput{
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      orginAnswerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createAt,
      updatedAt: answerComment.updateAt,
    }
  }
}
