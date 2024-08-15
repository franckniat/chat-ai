import React from 'react'
import { auth } from '@/auth'
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';


export default async function ChatPage({ id }: { id: string | undefined | null }) {
    const user = await auth();
    return (
        <>
            
        </>
    )
}
