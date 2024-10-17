import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchAnswerCommentsRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsResponse = Either<
  null,
  {
    answersComments: AnswerComment[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) { }

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answersComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, { page })

    return right({ answersComments })
  }
}
