import { Length, Matches } from 'class-validator';

export interface CreateEventParams {
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export class GetMonthParams {
  @Matches(/\d{4}-\d{2}/, { message: 'must be formatted as YYYY-MM' })
  month: string;
}
