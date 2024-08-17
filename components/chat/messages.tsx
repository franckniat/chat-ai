"use client";
import * as React from "react";
import useCurrentUser from "@/hooks/use-current-user";
import FormChat from "./form-chat";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Message } from "@prisma/client";
import StyledMarkdown from "./styled-markdown";
import {
	chatCompletion,
	createNewChat,
	sendMessage,
	sendUserMessage,
} from "@/actions/message";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowDown, Loader2 } from "lucide-react";

export default function MessagesContent({
	chatID,
	messages,
}: {
	chatID: string;
	messages: Message[];
}) {
	const user = useCurrentUser();
	const router = useRouter();
	const [input, setInput] = React.useState("");
	const [isPending, startTransition] = React.useTransition();
	const [messagesData, setMessagesData] = React.useState<Message[]>(messages);
	const messagesRef = React.useRef<HTMLDivElement>(null);
	const messagesEndRef = messagesRef.current
		?.lastElementChild as HTMLDivElement;
	const scrollButton = React.useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (messagesEndRef) {
			messagesEndRef.scrollIntoView({ behavior: "smooth" });
		}
	};

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting===false) {
						scrollButton.current?.classList.remove("hide");
					} else {
						scrollButton.current?.classList.add("hide");
					}
				});
			},
			{ threshold: 0.5 }
		);
		if (messagesEndRef) {
			observer.observe(messagesEndRef);
			return () => {
				observer.unobserve(messagesEndRef);
			};
		}
	}, [messagesEndRef]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			if (chatID === "") {
				await createNewChat(user!.id as string, input).then((res) => {
					if (res.error) {
						toast.error(res.error);
					} else if (res.chatID && res.IAMessage && res.userMessage) {
						router.push(`/chat/${res.chatID}`);
					}
				});
				setInput("");
			} else {
				await sendUserMessage(user!.id as string, chatID, input).then(
					async (res) => {
						if (res.error) {
							toast.error(res.error);
						} else if (res.userMessage) {
							setMessagesData((messages) => [
								...messages,
								res.userMessage,
							]);
							scrollToBottom();
							await chatCompletion(
								user!.id as string,
								chatID,
								input
							).then((res) => {
								if (res.error) {
									toast.error(res.error);
								} else if (res.iAmessage) {
									setMessagesData((messages) => [
										...messages,
										res.iAmessage,
									]);
								}
								scrollToBottom();
							});
						}
					}
				);

				setInput("");
			}
		});
	};

	return (
		<div className="relative">
			<div ref={messagesRef} className="space-y-5">
				{messagesData &&
					messagesData.map((m) => (
						<div key={m.id} className="flex gap-2 py-6 relative">
							{m.role === "user" ? (
								<Avatar className="border-4 border-primary-foreground">
									<AvatarFallback>
										{user?.name?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							) : (
								<Avatar className="border-4 border-primary">
									<AvatarFallback>AI</AvatarFallback>
								</Avatar>
							)}
							<div className="flex-1">
								<p className="font-bold">
									{m.role == "user"
										? user?.name
										: "Chat Assistant 🤖"}
								</p>
								<div className="result-ai">
									<StyledMarkdown content={m.content} />
								</div>
								<div className="absolute -bottom-2 right-2">
									<p className="text-sm text-foreground/40">
										{m.createdAt &&
											m.createdAt.toLocaleTimeString(
												"fr-FR",
												{
													hour: "2-digit",
													minute: "2-digit",
													second: "2-digit",
												}
											)}
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
			<div
				ref={scrollButton}
				className="flex justify-center items-center fixed bottom-0 -translate-y-[140px] -translate-x-1/2 left-1/2 transition-transform duration-200 scroll-button hide"
			>
				<Button
					size={"icon"}
					variant={"secondary"}
					className="rounded-full "
					onClick={() => scrollToBottom()}
				>
					{isPending ? (
						<Loader2 size={18} className="animate-spin" />
					) : (
						<ArrowDown size={18} />
					)}
				</Button>
			</div>
			<div className="my-2"></div>
			<FormChat
				input={input}
				handleInputChange={(e) => setInput(e.target.value)}
				handleSubmit={handleSendMessage}
				isLoading={isPending}
			/>
		</div>
	);
}
