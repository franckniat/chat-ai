"use client";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import ChatListProvider from "./chat-list";
import { Toaster } from "@/components/ui/sonner";


export default function Providers({children}:{children:React.ReactNode}){
    return (
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBar
                options={{ showSpinner: true }}
                height="4px"
                color="#8b5cf6"
            />
            <Toaster richColors closeButton />
            <ChatListProvider>
                {children}
            </ChatListProvider>
        </NextThemeProvider>
    )
}

const NextThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return (
        <ThemeProvider {...props}>
            {children}
        </ThemeProvider>
    )
}