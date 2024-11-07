import { DomainEvents } from '@/core/events/domain-events'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentRepository } from '../../repositories/attachment-repository'

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)

    DomainEvents.dispatchEventsForAggregate(attachment.id)
  }
}
