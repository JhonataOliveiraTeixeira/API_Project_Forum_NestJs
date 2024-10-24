import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | void>
  findManyByQuestionId(
    questiondId: string,
    params: PaginationParms,
  ): Promise<QuestionComment[]>
}
