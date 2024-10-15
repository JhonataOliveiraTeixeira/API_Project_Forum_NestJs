import { expect, describe, beforeEach, it } from 'vitest'
import { RegisterStudentUseCase } from '../../use-cases/register-student.ts/register-student'
import { FakeHasher } from 'test/cryptografy/fake-hasher'
import { InMemoryStudentsRepository } from '../repositories/in-memory-student-repository'

let inMemoryStudentRepository: InMemoryStudentsRepository
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Create Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher)
  })

  it('should be able create a student', async () => {
    const student = await sut.execute({
      name: 'Jhon Doe',
      email: 'Test@.com',
      password: '12345',
    })

    expect(student.isRight()).toBeTruthy()
    // expect(inMemoryStudentRepository.items[0].id).toEqual(
    //   student.isRight,
    // )
  })
})
