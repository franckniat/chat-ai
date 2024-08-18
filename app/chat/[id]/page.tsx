import React from 'react'
import { getUser } from '@/lib/user';
import { notFound, redirect } from 'next/navigation';
import { getChatById } from '@/actions/chat';
import { getMessagesBychatId } from '@/actions/message';
import MessagesContent from '@/components/chat/messages';


export default async function ChatPage({params}:{params:{id: string}}) {
    const user = await getUser();
    if(!user?.id) {
        notFound();
    }
    const { id } = params;
    const chat = await getChatById(id, user.id);
    const messages = await getMessagesBychatId(chat!.id)

    return (
        <>
            <MessagesContent chatID={id} messages={messages}/>
        </>
    )
}
