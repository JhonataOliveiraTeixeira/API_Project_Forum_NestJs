import { UseCaseError } from '@/core/erros/use-case-erros'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Nor Allowed')
  }
}
