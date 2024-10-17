import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../../repositories/answer-comment-repository'
import { AnswerRepository } from '../../repositories/answres-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../../core/erros/errors/resorce-not-found-error'
import { Injectable } from '@nestjs/common'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      answerId: new UniqueEntityID(answerId),
    })

    await this.answerCommentRepository.create(answerComment)

    return right({ answerComment })
  }
}
