import Navigation from '@/components/header'
import ChatList from '@/components/header/chat-list';
import React from 'react';

export default async function ChatsLayout({children}:{children:React.ReactNode}) {
  return (
    <>
        <Navigation/>
        <ChatList/>
        <section className="pt-[90px] pb-[160px] max-w-[800px] mx-auto">
            {children}
        </section>
    </>
  )
}
