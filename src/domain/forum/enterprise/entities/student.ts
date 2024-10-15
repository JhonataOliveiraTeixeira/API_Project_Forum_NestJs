import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface StudenteProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<StudenteProps> {
  get email() {
    return this.props.email
  }

  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  static create(props: StudenteProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
