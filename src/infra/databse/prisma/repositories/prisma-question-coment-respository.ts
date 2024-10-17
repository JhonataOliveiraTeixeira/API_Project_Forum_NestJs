import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionCommentMapper } from '../../mappers/prisma-question-comment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionComent implements QuestionCommentRepository {
  constructor(private prisma: PrismaService) {}

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(id: string): Promise<QuestionComment | void> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })
    if (comment) {
      return PrismaQuestionCommentMapper.toDomain(comment)
    }
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParms,
  ): Promise<QuestionComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        originQuestionId: questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return comments.map(PrismaQuestionCommentMapper.toDomain)
  }
}
