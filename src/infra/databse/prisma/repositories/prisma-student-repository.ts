/* eslint-disable prettier/prettier */
import { Student } from '@/domain/forum/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../../mappers/prisma-student-mapper'
import { StudentRepository } from '@/domain/forum/application/repositories/student-repository'

@Injectable()
export class PrismaStudentRespository implements StudentRepository {
  constructor(private primsa: PrismaService) {}

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)
    
    await this.primsa.user.create({
      data
    })
  }
  

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.primsa.user.findUnique({
      where:{
        email
      }
    })
    if(!student){
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async delete(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)
    
    await this.primsa.user.delete({
      where:{
        id: data.id
      }
    })
  }

  async save(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)
    
    await this.primsa.user.update({
      where:{
        id: data.id
      },
      data
    })
  }
}
