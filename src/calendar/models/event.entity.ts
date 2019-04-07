import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { EventDetailed } from './models';

@Entity()
export class EventEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  time: string;

  @Column()
  notification: boolean;
}
