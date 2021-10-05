import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity('user_auth_tokens')
export default class UserAuthToken extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;

  @Column('text')
  token: string | undefined;

  @Column("int")
  user_id: number | undefined;

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: Promise<User> | undefined
}