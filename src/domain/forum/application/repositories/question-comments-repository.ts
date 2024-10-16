import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | void>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParms,
  ): Promise<QuestionComment[]>
}
