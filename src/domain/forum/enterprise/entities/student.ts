import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface StudenteProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<StudenteProps> {
  get email() {
    return this.email
  }

  get name() {
    return this.email
  }

  get password() {
    return this.password
  }

  static create(props: StudenteProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
