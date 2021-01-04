import BaseModel from './base-model'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class UserAuthToken extends BaseModel {
  @Column('text')
  // @ts-ignore
  token: string;

  @ManyToOne(type => User)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  // @ts-ignore
  user: User
}