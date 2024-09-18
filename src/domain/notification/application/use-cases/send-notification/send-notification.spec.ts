import { describe, beforeEach, expect, it } from 'vitest'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from '../../test/repositories/in-memory-notification-repository'

let inMemoryNotificationRtepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationRtepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRtepository)
  })

  it('should be able send notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'nova nbotificação',
      content: 'Novo conteudo da resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRtepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
