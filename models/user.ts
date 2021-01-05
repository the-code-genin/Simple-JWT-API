import BaseModel from './base-model'
import { Column, Entity, OneToMany } from 'typeorm';
import UserAuthToken from './user_auth_token';

@Entity('users')
export default class User extends BaseModel {
    @Column('text')
    // @ts-ignore
    email: string;

    @Column('text')
    // @ts-ignore
    password: string;

    @OneToMany(type => UserAuthToken, (userAuthToken: UserAuthToken) => userAuthToken.user)
    // @ts-ignore
    userAuthTokens: UserAuthToken[]
}