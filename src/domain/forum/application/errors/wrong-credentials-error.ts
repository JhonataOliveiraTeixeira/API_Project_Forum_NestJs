import { UseCaseError } from '@/core/erros/use-case-erros'

export class WrongCredntialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials not valid.')
  }
}
