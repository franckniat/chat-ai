"use server";

import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
    return db.user.findFirst({
        where: { id }
    })
}

export const getAccountById = async (id: string) => {
    return db.account.findFirst({
        where: { userId : id }
    })
}