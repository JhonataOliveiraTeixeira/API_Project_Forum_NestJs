import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchRecenteQuestionRequest {
  page: number
}

type FetchRecenteQuestionResponse = Either<
  null,
  {
    question: Question[]
  }
>

@Injectable()
export class FetchRecenteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecenteQuestionRequest): Promise<FetchRecenteQuestionResponse> {
    const question = await this.questionRepository.findManyRecent({ page })

    return right({ question })
  }
}
