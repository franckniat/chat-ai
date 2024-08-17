"use server";

import { db } from "@/lib/db";

export const getChatById = async (id: string) =>{
    return db.chat.findFirst({
        where:{
            id
        }
    })
}

export const getChats = async (userId : string)=>{
    return db.chat.findMany({
        where:{
            userId
        }
    })
}