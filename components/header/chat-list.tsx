"use client";
import { useChatList } from "@/providers/chat-list";
import { Chat } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { MessageCirclePlus } from "lucide-react";

export default function ChatList({ chats }: { chats?: Chat[] }) {
	const { isOpen, toggle } = useChatList();
	const pathname = usePathname();
	return (
		<aside
			className={`w-[300px] h-[calc(100vh-65px)] bottom-0 border-r border-foreground/5 bg-background/85 backdrop-blur fixed transition-transform duration-200 ${
				isOpen ? "-translate-x-full" : ""
			}`}
		>
			<div className="flex items-center justify-between h-[60px] px-4 border-b border-foreground/5">
				<h2 className="font-medium text-foreground/80">
					Vos discussions
				</h2>
			</div>
			<div className="px-4 py-2 max-h-[calc(100vh-125px)] overflow-y-auto">
				<div className="flex flex-col gap-1">
					<Link
						href={`/chat`}
						className="text-sm font-medium my-1"
					>
						<Button className="w-full gap-2" variant={"outline"}>
							<MessageCirclePlus size={18}/> Nouveau chat
						</Button>
					</Link>
					{chats?.map((chat, index) => (
						<Link
							href={`/chat/${chat.id}`}
							key={index}
							className={`text-sm font-medium hover:bg-foreground/5 rounded-md px-3 py-3 ${
								pathname === `/chat/${chat.id}` &&
								"bg-foreground/5"
							}`}
						>
							<span>{chat.name.replace('"', "")}</span>
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
}
