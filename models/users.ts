export interface User {
    id: number;
    created_at: Date;
    updated_at: Date;
    email: string;
    password: string;
}

export interface UserJSON extends Omit<User, "password"> {
    //
}

export default class Users {
    static getQueryBuilder() {
        return global.db<User>("users");
    }

    static async getUsersWithEmailCount(email: string) {
        const total = (await Users
            .getQueryBuilder()
            .where("email", email)
            .count("*", { as: "total" })
        )[0].total;
        return Number(total);
    }

    static async getUserByEmail(email: string) {
        return await Users
            .getQueryBuilder()
            .where("email", email)
            .first();
    }

    static async getUserByID(id: number) {
        return Users
            .getQueryBuilder()
            .where("id", id)
            .first();
    }

    static async checkUserHasAuthToken(userId: number, token: string) {
        const total = (await global
            .db("user_auth_tokens")
            .where("user_id", userId)
            .where("token", token)
            .count("*", { as: "total" })
        )[0].total;
        return Number(total) != 0;
    }

    static async addUserAuthToken(userId: number, token: string) {
        if (await Users.checkUserHasAuthToken(userId, token)) {
            throw new Error("User already has this auth token.");
        }

        const insertId = await global
            .db("user_auth_tokens")
            .insert({
                user_id: userId,
                token
            });
        return insertId.length == 1;
    }

    static async save(user: Partial<User>) {
        const insertId = await Users
            .getQueryBuilder()
            .insert(user);
        if (insertId.length != 1) throw new Error("An error occured while creating the user");
        return await Users.getUserByID(insertId[0]) as User;
    }

    static toJSON(user: User) {
        const hiddenFields = ['password'];
        let data = Object.entries(user).filter(entry => !hiddenFields.includes(entry[0]));
        return Object.fromEntries(data) as UserJSON;
    }
}