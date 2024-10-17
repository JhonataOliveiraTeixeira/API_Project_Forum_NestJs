import { PaginationParms } from '@/core/repositories/pagination-parms'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from '../../mappers/prisma-answer-comment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswerComentRepository implements AnswerCommentRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<AnswerComment | null> {
    console.log(id)
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })
    if (!comment) {
      return null
    }

    return PrismaAnswerCommentMapper.toDomain(comment)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answerComment.id.toString(),
      },
    })
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParms,
  ): Promise<AnswerComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        orginAnswerId: answerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return comments.map(PrismaAnswerCommentMapper.toDomain)
  }
}
