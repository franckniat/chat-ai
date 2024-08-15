import { auth } from "@/auth"

export const getUser = async () => {
    const session = await auth();
    return session?.user;
}