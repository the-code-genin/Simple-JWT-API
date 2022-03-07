export interface User {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    email?: string;
    password?: string;
}

export interface UserJSON extends Omit<User, "password"> {
    //
}

export function toJSON(user: User): UserJSON {
    const hiddenFields = ['password'];
    let data = Object.entries(user).filter(entry => !hiddenFields.includes(entry[0]));
    return Object.fromEntries(data);
}

export default global.db<User>("users");