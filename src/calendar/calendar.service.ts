import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/event.entity';
import { Repository } from 'typeorm';
import {
  CreateEventParams,
  EventsOnDate,
  EventDetailed,
} from './models/models';
import * as eachDay from 'date-fns/each_day';
import format = require('date-fns/format');

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(event: CreateEventParams): Promise<EventEntity> {
    return await this.eventRepository.save(event);
  }

  async getEventsInMonth(month: string): Promise<EventsOnDate[]> {
    const eventsInMonth = (await this.eventRepository.find()).filter(
      ({ time }) => time.includes(month),
    );

    return eachDay(`${month}-01`, `${month}-31`).map(date => {
      const dateFormatted = format(date, 'YYYY-MM-DD');

      return {
        date: dateFormatted,
        events: eventsInMonth
          .filter(({ time }) => time.includes(dateFormatted))
          .map(this.serializeEvent),
      };
    });
  }

  async getEventsInDay(day: string): Promise<EventDetailed[]> {
    return (await this.eventRepository.find())
      .filter(({ time }) => time.includes(day))
      .map(this.serializeEvent);
  }

  private serializeEvent = (event: EventEntity): EventDetailed => ({
    ...event,
    id: event.id.toString(),
  });
}
