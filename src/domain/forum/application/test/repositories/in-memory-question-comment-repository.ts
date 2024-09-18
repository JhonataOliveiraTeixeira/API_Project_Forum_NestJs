import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../../repositories/question-comments-repository'
import { PaginationParms } from '@/core/repositories/pagination-parms'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questioncomment = this.items.find((item) => item.id.toString() === id)

    if (!questioncomment) {
      throw new Error('QuestionComment not found')
    }

    return questioncomment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParms) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async create(questioncomment: QuestionComment) {
    this.items.push(questioncomment)
  }
}
