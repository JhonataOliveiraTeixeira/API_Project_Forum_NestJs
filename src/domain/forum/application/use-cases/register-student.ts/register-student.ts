import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { StudentRepository } from '../../repositories/student-repository'
import { StudentAlreadyExistError } from '../../errors/student-already-exist-error'
import { Hasher } from '../../cryptography/hasher'

interface RegisterStundetUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashGenerator: Hasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStundetUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const userWithSameEmail = await this.studentRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new StudentAlreadyExistError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    this.studentRepository.create(student)

    return right({ student })
  }
}
