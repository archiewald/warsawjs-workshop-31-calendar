import { Controller, Get, Query } from '@nestjs/common';
import { DateEvents, EventDetailed } from './models';
import { CALENDAR, DAY } from './stub';

@Controller('')
export class CalendarController {
  @Get('/calendar')
  getMonth(@Query('month') month: string): { data: DateEvents[] } {
    return {
      data: CALENDAR.data,
    };
  }

  @Get('/day')
  getDay(@Query('date') day: string): { data: EventDetailed[] } {
    return {
      data: DAY.data,
    };
  }
}
