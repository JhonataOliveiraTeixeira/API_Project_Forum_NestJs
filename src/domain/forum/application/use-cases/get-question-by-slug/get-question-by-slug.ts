import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../../core/erros/errors/resorce-not-found-error'

interface GetQuestionBySlugRequest {
  slug: string
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
