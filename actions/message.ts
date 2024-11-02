"use server";

import { db } from "@/lib/db";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";

export const getMessagesBychatId = async (chatId: string) => {
    return db.message.findMany({
        where: {
            chatId
        }
    })
}

export const createNewChat = async (userId: string, prompt: string) => {
    const chatID = uuidv4();

    const result = await streamText({
        model: openai("gpt-4o"),
        prompt: `Prend ce message et reformule le moi en titre de conversation original: ${prompt} `,
    })
    const resultPrompt = await streamText({
        model: openai('gpt-4o'),
        prompt: prompt,
    })

    if (!result.toAIStreamResponse().ok) {
        return {
            error: "Problème de connexion, veuillez réessayer plus tard."
        }
    }
    const title = (await result.toTextStreamResponse().text()).trim()
    await db.chat.create({
        data: {
            id: chatID,
            name: title,
            userId,
        },
    });
    const userMessage = await db.message.create({
        data: {
            chatId: chatID,
            userId,
            role: "user",
            content: prompt,
        }
    });
    const IAMessage = await db.message.create({
        data: {
            chatId: chatID,
            userId,
            role: "ai",
            content: (await resultPrompt.toTextStreamResponse().text()).trim()
        }
    })

    revalidatePath(`/chat/${chatID}`)

    return {
        chatID,
    }
}

export const sendUserMessage = async (userId: string, chatId: string, message: string) => {
    try {
        const userMessage = await db.message.create({
            data: {
                chatId,
                userId,
                role: "user",
                content: message
            }
        })
        revalidatePath(`/chat/${chatId}`)
        await chatCompletion(userId,chatId, message)
        revalidatePath(`/chat/${chatId}`)
    }
    catch (e) {
        return {
            error: "Un problème est survenu, vérifier votre connexion internet."
        }
    }
}

export const chatCompletion = async (userId: string, chatId: string, message: string) => {
    try {
        const result = await streamText({
            model: openai("gpt-4o"),
            prompt: message,
        });
        const IAResponse = (await result.toTextStreamResponse().text()).trim()
        const IAMessage = await db.message.create({
            data: {
                chatId,
                userId,
                role: "ai",
                content: IAResponse
            }
        })
    } catch (e) {
        return {
            error: "Un problème est survenu, vérifier votre connexion internet."
        }
    }
}