import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/event.entity';
import { Repository } from 'typeorm';
import { Event } from './models/models';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(event: Event): Promise<EventEntity> {
    return await this.eventRepository.create(event);
  }
}
