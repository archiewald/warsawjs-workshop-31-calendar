import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/event.entity';
import { Repository } from 'typeorm';
import { EventDetailedSerialized } from './models/models';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(event: EventDetailedSerialized): Promise<EventEntity> {
    return await this.eventRepository.save(event);
  }
}
