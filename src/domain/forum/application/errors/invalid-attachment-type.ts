import { UseCaseError } from '@/core/erros/use-case-erros'

export class AttachmentTypeError extends Error implements UseCaseError {
  constructor() {
    super('Attachment type not valid.')
  }
}
