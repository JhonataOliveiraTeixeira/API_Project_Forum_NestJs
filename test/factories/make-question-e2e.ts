import { makeQuestion } from '@/domain/forum/application/test/factories/make-question'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { PrismaQuestionMapper } from '@/infra/databse/mappers/prisma-question-mapper'
import { PrismaService } from '@/infra/databse/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)
    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })
    return question
  }
}
