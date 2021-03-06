import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './models/event.entity';
import { Repository } from 'typeorm';
import { EventsOnDate, EventDetailed } from './models/models';

import * as eachDay from 'date-fns/each_day';
import * as format from 'date-fns/format';
import { CreateEventParams } from './models/params';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(event: CreateEventParams): Promise<EventDetailed> {
    const result = await this.eventRepository.save(event);
    return this.serializeEvent(result);
  }

  async updateEvent(event: EventDetailed): Promise<void> {
    await this.eventRepository.update(event.id, event);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }

  async getEventsInMonth(month: string): Promise<EventsOnDate[]> {
    if (!month) {
      throw Error();
    }

    const eventsInMonth = (await this.eventRepository.find()).filter(
      ({ time }) => time.includes(month),
    );

    return eachDay(`${month}-01`, `${month}-42`).map(date => {
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
