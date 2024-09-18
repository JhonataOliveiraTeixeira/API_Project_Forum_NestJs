import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domanEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domanEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domanEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domanEvents = []
  }
}
