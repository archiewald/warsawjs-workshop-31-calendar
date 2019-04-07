import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import {
  EventsOnDate,
  EventDetailed,
  Event,
  EventDetailedSerialized,
} from './models/models';
import { CALENDAR, DAY } from './stub';
import { CalendarService } from './calendar.service';

@Controller('')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/calendar')
  getMonth(@Query('month') month: string): { data: EventsOnDate[] } {
    return {
      data: CALENDAR.data.filter(({ date }) => date.includes(month)),
    };
  }

  @Get('/day')
  getDay(@Query('date') day: string): { data: EventDetailed[] } {
    return {
      data: DAY.data,
    };
  }

  @Post('/event')
  async createEvent(
    @Body() event: EventDetailedSerialized,
  ): Promise<{ id: string }> {
    return {
      id: (await this.calendarService.createEvent(event)).id.toString(),
    };
  }
}
