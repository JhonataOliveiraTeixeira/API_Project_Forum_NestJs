import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../../core/erros/errors/resorce-not-found-error'
import { AnswerRepository } from '../../repositories/answres-repository'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentRepository } from '../../repositories/answer-attachment-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachemntRepository: AnswerAttachmentRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttchaments =
      await this.answerAttachemntRepository.findManyByAnswerId(answerId)

    const answerAttachemntList = new AnswerAttachmentList(
      currentAnswerAttchaments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachemntList.update(answerAttachments)

    answer.attachments = answerAttachemntList

    answer.content = content

    await this.answerRepository.save(answer)

    return right(null)
  }
}
