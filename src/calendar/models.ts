export interface Event {
  id: string;
  title: string;
}

export interface EventDetailed extends Event {
  description: string;
  time: string;
  notification: boolean;
}

export interface DateEvents {
  date: string;
  events: Event[];
}
