import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, OneToMany } from 'typeorm';
import UserAuthToken from './user_auth_token';

@Entity('users')
export default class User extends BaseEntity {
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
    email: string;

    @Column('text', {select: false})
    // @ts-ignore
    password: string;

    @OneToMany(type => UserAuthToken, (userAuthToken: UserAuthToken) => userAuthToken.user)
    // @ts-ignore
    userAuthTokens: Promise<UserAuthToken[]>
}