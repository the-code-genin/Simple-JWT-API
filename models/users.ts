const users = global.db<User>("users");

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

export function userToJSON(user: User): UserJSON {
    const hiddenFields = ['password'];
    let data = Object.entries(user).filter(entry => !hiddenFields.includes(entry[0]));
    return Object.fromEntries(data);
}

export async function getUsersCountWithEmail(email: string) {
    return Number((await users.where("email", email).count("*", {as: "total"}))[0].total);
}

export async function getUserByEmail(email: string) {
    return users.where("email", email).first();
}

export default () => users;