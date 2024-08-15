"use client"
import * as React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowUp } from 'lucide-react';

interface FormChatProps {
    isLoading?: boolean;
    handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    input?: string;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormChat({isLoading, input, handleInputChange, handleSubmit}:FormChatProps) {
    return (
        <div className="fixed bottom-0 right-0 left-0 max-w-[800px] mx-auto">
            <div className=" py-8 px-3 bg-background/80 backdrop-blur-md">
                <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <Input className="w-full" placeholder="Envoyer un message" value={input} onChange={handleInputChange} />
                    <Button type="submit" disabled={isLoading}><ArrowUp size={20} /></Button>
                </form>
                <p className='text-xs text-center mt-3 text-foreground/50'>
                    Pensez à vérifier les informations que l&#039;IA vous donne, il peut arriver qu&#039;elle se trompe.
                </p>
            </div>
        </div>
    )
}
