import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, OneToMany } from 'typeorm';
import UserAuthToken from './user_auth_token';

@Entity('users')
export default class User extends BaseEntity implements Serializable {
    @PrimaryGeneratedColumn('increment')
    // @ts-ignore
    id: number;

    @CreateDateColumn()
    // @ts-ignore
    created_at: String;

    @UpdateDateColumn()
    // @ts-ignore
    updated_at: String;

    @Column('varchar', {length: 255})
    // @ts-ignore
    email: string;

    @Column('varchar', {length: 255})
    // @ts-ignore
    password: string;

    @OneToMany(type => UserAuthToken, (userAuthToken: UserAuthToken) => userAuthToken.user)
    // @ts-ignore
    userAuthTokens: Promise<UserAuthToken[]>

    toJSON() {
        let data = Object.entries(this).filter(entry => ['password'].indexOf(entry[0]) == -1);
        return Object.fromEntries(data);
    }
}