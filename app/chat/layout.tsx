import Navigation from '@/components/header'
import React from 'react';
import { getUser } from '@/lib/user';
import { getChats } from '@/actions/chat';
import { Chat } from '@prisma/client';

export default async function ChatsLayout({children}:{children:React.ReactNode}) {
  const user = await getUser();
  const chats = await getChats(user!.id as string)
  return (
    <>
        <Navigation chats={chats}/>
        <section className="pt-[90px] pb-[160px] max-w-[800px] mx-auto">
            {children}
        </section>
    </>
  )
}
