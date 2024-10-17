import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../../repositories/question-comments-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchQuestionCommentsRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsResponse = Either<
  null,
  {
    questionsComments: QuestionComment[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionsComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionsComments })
  }
}
