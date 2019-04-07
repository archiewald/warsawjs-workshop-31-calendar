import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  EventsOnDate,
  EventDetailed,
  Event,
  CreateEventParams,
} from './models/models';
import { CalendarService } from './calendar.service';

@Controller('')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/calendar')
  async getMonth(
    @Query('month') month: string,
  ): Promise<{ data: EventsOnDate[] }> {
    return {
      data: await this.calendarService.getEventsInMonth(month),
    };
  }

  @Get('/day')
  async getDay(@Query('date') day: string): Promise<{ data: EventDetailed[] }> {
    return {
      data: await this.calendarService.getEventsInDay(day),
    };
  }

  @Post('/event')
  async createEvent(@Body() event: CreateEventParams): Promise<{ id: string }> {
    return {
      id: (await this.calendarService.createEvent(event)).id.toString(),
    };
  }

  @Put('/event/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body() event: CreateEventParams,
  ): Promise<{ id: string }> {
    await this.calendarService.updateEvent({ id, ...event });
    return { id };
  }

  @Delete('/event/:id')
  async deleteEvent(@Param('id') id: string): Promise<{ id: string }> {
    await this.calendarService.deleteEvent(id);
    return { id };
  }
}
