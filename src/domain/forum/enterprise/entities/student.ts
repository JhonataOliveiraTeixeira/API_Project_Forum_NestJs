import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface StudenteProps {
  name: string
}

export class Student extends Entity<StudenteProps> {
  static create(props: StudenteProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
