import { PaginationParms } from '@/core/repositories/pagination-parms'
import { Answer } from '../../enterprise/entities/answer'

export abstract class AnswerRepository {
  abstract findById(answerId: string): Promise<Answer | null>
  abstract findByQuestionId(
    questionId: string,
    { page }: PaginationParms,
  ): Promise<Answer[]>

  abstract create(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
}
