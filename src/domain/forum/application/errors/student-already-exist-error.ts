import { UseCaseError } from '@/core/erros/use-case-erros'

export class StudentAlreadyExistError extends Error implements UseCaseError {
  constructor() {
    super('Student with same e-mail adress already exists.')
  }
}
