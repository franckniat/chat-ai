"use client";

import { useChat } from "ai/react";
import useCurrentUser from "@/hooks/use-current-user";
import FormChat from "./form-chat";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function MessagesContent() {
    const user = useCurrentUser();
    const { messages, handleInputChange, handleSubmit, input, isLoading } = useChat();
    return (
        <div>
            {messages.map(m =>
                <div key={m.id} className="flex gap-2 mb-5">
                    {m.role === "user"
                        ?
                        <Avatar className="border border-primary">
                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        :
                        <Avatar className="border border-primary-foreground/40">
                            <AvatarFallback >AI</AvatarFallback>
                        </Avatar>
                    }
                    <div className="flex-1">
                        <p className="font-bold">{m.role == "user" ? user?.name : "Chat Assistant"}</p>
                        <div className="result-ai">
                            <Markdown remarkPlugins={[[remarkGfm, { singleTilde: true }]]}>{m.content}</Markdown>
                        </div>
                    </div>
                </div>
            )}
            <FormChat
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    )
}
