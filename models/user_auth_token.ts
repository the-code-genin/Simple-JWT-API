import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity('user_auth_tokens')
export default class UserAuthToken extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined;

  @CreateDateColumn()
  created_at: String | undefined;

  @UpdateDateColumn()
  updated_at: String | undefined;

  @Column('text')
  token: string | undefined;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: Promise<User> | undefined
}