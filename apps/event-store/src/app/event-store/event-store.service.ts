import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import EJSON from 'ejson';
import { AmqpService } from '../amqp/amqp.service';
import { EXCHANGE_NAME } from '../constants';
import { EventStoreRepository } from './event-store.repository.interface';

@Injectable()
export class EventStoreService implements OnApplicationBootstrap {
  constructor(
    private readonly amqpService: AmqpService,
    private readonly eventStoreRepository: EventStoreRepository,
  ) {}

  async onApplicationBootstrap() {
    await this.storeEvents();
  }

  async storeEvents() {
    const routingKey = 'event.#';
    const queue = 'q.EventStore';

    await this.amqpService.addSubscriber(EXCHANGE_NAME, routingKey, queue, async (msg) => {
      const decodedMessage = EJSON.parse(msg.toString('utf-8'));
      await this.eventStoreRepository.save(decodedMessage);
    });
  }
}
