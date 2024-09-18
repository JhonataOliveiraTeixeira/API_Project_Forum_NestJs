import { Notification } from '../../enterprise/notification'

export interface NoitificationRepository {
  findById(id: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
  create(notification: Notification): Promise<void>
}
