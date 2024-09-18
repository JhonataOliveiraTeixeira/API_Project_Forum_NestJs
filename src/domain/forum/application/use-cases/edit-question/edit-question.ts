import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../../core/erros/errors/resorce-not-found-error'
import { NotAllowedError } from '../../../../../core/erros/errors/not-allowed-error'
import { QuestionAttachmentRepository } from '../../repositories/question-attachment-repository'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttchaments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId)

    const questionAttachemntList = new QuestionAttachmentList(
      currentQuestionAttchaments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachemntList.update(questionAttachments)

    question.attachments = questionAttachemntList
    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right(null)
  }
}
