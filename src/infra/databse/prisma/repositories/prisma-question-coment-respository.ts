import { PaginationParms } from '@/core/repositories/pagination-parms'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionComent implements QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<QuestionComment | void> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questiondId: string,
    params: PaginationParms,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }
}
