/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { User as PrismaStudent, Prisma} from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(prismaStudent: PrismaStudent) {
    return Student.create(
      {
       email: prismaStudent.email,
       name: prismaStudent.name,
       password: prismaStudent.password
      },
      new UniqueEntityID(prismaStudent.id),
    )
  }

  static toPrisma(student:Student): Prisma.UserUncheckedCreateInput{
    return {
      id: student.id.toString(),
      email: student.email,
      name: student.name,
      password: student.password,
  }
}}
