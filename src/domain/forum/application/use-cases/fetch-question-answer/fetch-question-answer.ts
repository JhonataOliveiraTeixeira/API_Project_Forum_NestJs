import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '../../repositories/answres-repository'
import { Either, right } from '@/core/either'

interface FecthQuestionAnswersRequest {
  page: number
  questionId: string
}

type FecthQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FecthQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,

    page,
  }: FecthQuestionAnswersRequest): Promise<FecthQuestionAnswersResponse> {
    const answers = await this.answerRepository.findByQuestionId(questionId, {
      page,
    })

    return right({ answers })
  }
}
