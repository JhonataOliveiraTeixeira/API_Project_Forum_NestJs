import { NoitificationRepository } from '../../repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/notification'

export class InMemoryNotificationRepository implements NoitificationRepository {
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      throw new Error('Notification not found')
    }

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
