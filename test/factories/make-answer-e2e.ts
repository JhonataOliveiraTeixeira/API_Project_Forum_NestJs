import { makeAnswer } from '@/domain/forum/application/test/factories/make-answer'
import { Answer, Answerprops } from '@/domain/forum/enterprise/entities/answer'
import { PrismaAnswerMapper } from '@/infra/databse/mappers/prisma-answer-mappers'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<Answerprops> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })
    return answer
  }
}
