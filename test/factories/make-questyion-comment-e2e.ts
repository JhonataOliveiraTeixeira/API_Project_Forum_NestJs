import { makeQuestionComment } from '@/domain/forum/application/test/factories/make-question-comment'
import {
  QuestionComment,
  QuestionCommentprops,
} from '@/domain/forum/enterprise/entities/question-comment'
import { PrismaQuestionCommentMapper } from '@/infra/databse/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentprops> = {},
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
