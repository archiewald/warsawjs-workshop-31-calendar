import { Controller, Get, Query } from '@nestjs/common';
import { EventsOnDate, EventDetailed } from './models/models';
import { CALENDAR, DAY } from './stub';

@Controller('')
export class CalendarController {
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
}
