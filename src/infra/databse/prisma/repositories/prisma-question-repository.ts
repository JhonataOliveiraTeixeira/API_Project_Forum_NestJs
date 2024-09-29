/* eslint-disable prettier/prettier */
import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionRespository implements QuestionsRepository {
  constructor(private primsa: PrismaService) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    
    await this.primsa.question.create({
      data
    })
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.primsa.question.findUnique({
      where:{
        slug
      }
    })
    if(!question){
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }
  

  async findById(id: string): Promise<Question | null> {
    const question = await this.primsa.question.findUnique({
      where:{
        id
      }
    })
    if(!question){
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParms): Promise<Question[]> {
    const questions = await this.primsa.question.findMany({
      orderBy:{
        createdAt: "desc"
      },
      take: 20,
      skip: ((page - 1) * 20)
    })
    return questions.map(question =>{
      return PrismaQuestionMapper.toDomain(question)
    })
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    
    await this.primsa.question.delete({
      where:{
        id: data.id
      }
    })
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    
    await this.primsa.question.update({
      where:{
        id: data.id
      },
      data
    })
  }
}
