import { PaginationParms } from '@/core/repositories/pagination-parms'
import { AnswerRepository } from '@/domain/forum/application/repositories/answres-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../../mappers/prisma-answer-mappers'

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  constructor(private prisma: PrismaService) { }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id: answerId,
      },
    })

    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findByQuestionId(
    questionId: string,
    { page }: PaginationParms,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }
}
