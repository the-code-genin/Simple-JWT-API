import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, BaseEntity, OneToMany } from 'typeorm';
import UserAuthToken from './user_auth_token';

@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @CreateDateColumn()
    created_at: Date | undefined;

    @UpdateDateColumn()
    updated_at: Date | undefined;

    @Column('varchar', { length: 255, unique: true })
    email: string | undefined;

    @Column('varchar', { length: 255 })
    password: string | undefined;

    @OneToMany(() => UserAuthToken, (userAuthToken: UserAuthToken) => userAuthToken.user)
    userAuthTokens: Promise<UserAuthToken[]> | undefined

    toJSON() {
        const hiddenFields = ['password'];
        let data = Object.entries(this).filter(entry => hiddenFields.indexOf(entry[0]) == -1);
        return Object.fromEntries(data);
    }
}