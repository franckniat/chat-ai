"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignJustify, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import useCurrentUser from "@/hooks/use-current-user";
import { logout } from "@/actions/auth";
import { User } from "next-auth";
import { useChatList } from "@/providers/chat-list";

export default function Navigation() {
    const { theme, setTheme } = useTheme();
    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }
    const handleLogout = async () => {
        await logout();
    }
    const user = useCurrentUser() as User;
    const { toggle, isOpen } = useChatList();

    return (
        <>
            <nav className="fixed bg-background/80 backdrop-blur border-b border-foreground/5 w-full z-50">
                <section className="px-4 text-sm mx-auto">
                    <section className="flex items-center justify-between h-[65px]">
                        <div className="flex gap-4 items-center">
                            <Button onClick={toggle} variant={"ghost"} size={"icon"}>
                                <AlignJustify/>
                            </Button>
                            <Link href={"/chat"} className="text-lg font-bold">
                                Niato Chat
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button className="relative" variant="ghost" size="icon" onClick={handleTheme}>
                                <Moon className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition" size={20} />
                                <Sun className="scale-100 dark:scale-0 rotate-45 dark:rotate-0 transition absolute" size={20} />
                            </Button>
                            <div className="hidden md:flex gap-2">
                                <Button title="Se déconnecter" variant="outline" onClick={handleLogout}>Se déconnecter</Button>
                            </div>
                        </div>
                    </section>
                </section>
            </nav>
        </>
    )
}