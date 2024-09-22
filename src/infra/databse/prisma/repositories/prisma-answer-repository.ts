import { PaginationParms } from '@/core/repositories/pagination-parms'
import { AnswerRepository } from '@/domain/forum/application/repositories/answres-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  findById(answerId: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }

  findByAnswerId(
    questionId: string,
    params: PaginationParms,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
