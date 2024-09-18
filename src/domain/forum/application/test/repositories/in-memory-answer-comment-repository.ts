import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'
import { PaginationParms } from '@/core/repositories/pagination-parms'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answercomment = this.items.find((item) => item.id.toString() === id)

    if (!answercomment) {
      throw new Error('answerComment not found')
    }

    return answercomment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParms) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
