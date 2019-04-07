export interface Event {
  id: string;
  title: string;
}

export interface EventDetailed extends Event {
  description: string;
  time: string;
  notification: boolean;
}

export interface EventDetailedSerialized {
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface EventsOnDate {
  date: string;
  events: Event[];
}
