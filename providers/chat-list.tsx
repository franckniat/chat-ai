"use client"
import React, { createContext, useContext, useState } from 'react'

type ChatListContextType = {
    isOpen: boolean;
    toggle: () => void;
}

export const ChatContext = createContext<ChatListContextType>({
    isOpen: false,
    toggle: () => {}
});

export default function ChatListProvider({children}: { children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <ChatContext.Provider value={{ isOpen, toggle }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChatList = () => useContext(ChatContext);
