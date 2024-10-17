import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resorce-not-found-error'
import { Injectable } from '@nestjs/common'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right(null)
  }
}
