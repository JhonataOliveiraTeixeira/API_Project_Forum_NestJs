/* eslint-disable prettier/prettier */
import { makeStudent } from "@/domain/forum/application/test/factories/make-student"
import { Student, StudenteProps } from "@/domain/forum/enterprise/entities/student"
import { PrismaStudentMapper } from "@/infra/databse/mappers/prisma-student-mapper"
import { PrismaService } from "@/infra/databse/prisma/prisma.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) { }
  async makePrismaStudent(data: Partial<StudenteProps> = {}): Promise<Student> {
    const student = makeStudent(data)
    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })
    return student
  }
}
