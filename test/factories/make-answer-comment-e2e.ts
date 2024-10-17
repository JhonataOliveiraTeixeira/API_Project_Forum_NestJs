import { makeAnswerComment } from '@/domain/forum/application/test/factories/make-answer-comment'
import {
  AnswerComment,
  AnswerCommentprops,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { PrismaAnswerCommentMapper } from '@/infra/databse/mappers/prisma-answer-comment-mapper'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(
    data: Partial<AnswerCommentprops> = {},
  ): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}
