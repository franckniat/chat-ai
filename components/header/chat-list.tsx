"use client"
import { useChatList } from '@/providers/chat-list';
import * as React from 'react';

interface ChatProps {
    title?: string;
    href?: string;
}

export default function ChatList({
    chats
}: {
    chats?: ChatProps[]
}) {
    const { isOpen, toggle } = useChatList();

    return (
        <aside className={`w-[300px] h-[calc(100vh-65px)] bottom-0 border-r border-foreground/5 bg-background/85 backdrop-blur fixed transition-transform duration-200 ${isOpen ? "-translate-x-full" : ""}`}>
            <div className="flex items-center justify-between h-[60px] px-4 border-b border-foreground/5">
                <h2 className="font-medium text-foreground/80">Vos discussions</h2>
            </div>
            <div className='px-4 py-2 max-h-[calc(100vh-125px)] overflow-y-auto'>
                <ul>
                    {chats?.map((chat, index) => (
                        <li key={index} className="px-2 py-3 border-b border-foreground/20">
                            <a href={chat.href} className="text-lg font-medium">{chat.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
