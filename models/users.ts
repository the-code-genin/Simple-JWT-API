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
    const total = (await global.db<User>("users")
        .where("email", email)
        .count("*", {as: "total"})
    )[0].total;
    return Number(total);
}

export async function getUserByEmail(email: string) {
    return global.db<User>("users")
        .where("email", email)
        .first();
}

export async function getUserByID(id: number) {
    return global.db<User>("users")
        .where("id", id)
        .first();
}

export async function saveUser(user: User) {
    const insertId = await global.db<User>("users")
        .insert(user);
    if (insertId.length != 1) throw new Error("An error occured while creating the user");
    return getUserByID(insertId[0]) as User;
}

export default () => global.db<User>("users");