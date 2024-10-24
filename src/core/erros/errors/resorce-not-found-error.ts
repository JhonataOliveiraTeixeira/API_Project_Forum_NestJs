import { UseCaseError } from '@/core/erros/use-case-erros'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
