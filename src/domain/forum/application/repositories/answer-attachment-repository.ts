import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentRepository {
  abstract createMany(attachemnts: AnswerAttachment[]): Promise<void>
  abstract deleteMany(attachemnts: AnswerAttachment[]): Promise<void>
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
