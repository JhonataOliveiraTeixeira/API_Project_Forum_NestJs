import { describe, beforeEach, expect, it } from 'vitest'
import { ReadNotificationUseCase } from './read-notification'
import { InMemoryNotificationRepository } from '../../test/repositories/in-memory-notification-repository'
import { makeNotification } from '../../test/factories/make-notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryNotificationRtepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationRtepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRtepository)
  })

  it('should be able read a notification', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('1'),
    })

    await inMemoryNotificationRtepository.create(notification)

    const result = await sut.execute({
      recipientId: '1',
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRtepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })
})
