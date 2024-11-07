import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentRepository {
  abstract createMany(attachemnts: QuestionAttachment[]): Promise<void>
  abstract deleteMany(attachemnts: QuestionAttachment[]): Promise<void>
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
