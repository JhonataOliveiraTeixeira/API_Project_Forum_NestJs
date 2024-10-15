/* eslint-disable prettier/prettier */
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../../repositories/student-repository'
import { Compare } from '../../cryptography/compare'
import { Encrypter } from '../../cryptography/encrypter'
import { WrongCredntialsError } from '../../errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredntialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private compare: Compare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    
    const student = await this.studentRepository.findByEmail(email)


    if (!student) {
      console.log("Erro")

      return left(new WrongCredntialsError())
    }

    const comparePassword = await this.compare.comapre(
      password,
      student.password,
    ) 

    if(!comparePassword){
      console.log("Erro")
      return left(new WrongCredntialsError())

    }

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString()})

    return right({
      accessToken
    })
  }
}
