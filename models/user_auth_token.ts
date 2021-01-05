import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity('user_auth_tokens')
export default class UserAuthToken extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  // @ts-ignore
  id: number;

  @CreateDateColumn()
  // @ts-ignore
  created_at: String;

  @UpdateDateColumn()
  // @ts-ignore
  updated_at: String;

  @Column('text')
  // @ts-ignore
  token: string;

  @ManyToOne(type => User)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  // @ts-ignore
  user: Promise<User>
}