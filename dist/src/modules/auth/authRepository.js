import { db } from "../../config/database/index.js";
export const findUserByEmail = async (email) => {
    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return user;
};
export const findUserWithPassword = async (email) => {
    const user = await db.user.findUnique({
        where: { email },
    });
    return user;
};
export const createUser = async (data) => {
    const user = await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return user;
};
