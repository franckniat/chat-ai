"use client";
import * as React from "react";
import useCurrentUser from "@/hooks/use-current-user";
import FormChat from "./form-chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { Message } from "@prisma/client";
import StyledMarkdown from "./styled-markdown";
import {
	chatCompletion,
	createNewChat,
	sendUserMessage,
} from "@/actions/message";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	ArrowDown,
	BookOpen,
	Calendar,
	Loader2,
	Mail,
	Wrench,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function MessagesContent({
	chatID,
	messages,
}: {
	chatID: string;
	messages: Message[];
}) {
	const newChatOptions = [
		{
			title: "Aide moi à résumer ce mail",
			content: "Aide moi à résumer ce mail",
			icon: <Mail size={24} />,
		},
		{
			title: "J'ai besoin de planifier mes journées",
			content: "J'ai besoin de planifier mes journées",
			icon: <Calendar size={24} />,
		},
		{
			title: "Quels sont les avantages des nouvelles technologies ?",
			content: "Quels sont les avantages des nouvelles technologies ?",
			icon: <Wrench size={24} />,
		},
		{
			title: "J'ai besoin d'aide pour rédiger un mémoire",
			content: "J'ai besoin d'aide pour rédiger un mémoire",
			icon: <BookOpen size={24} />,
		},
	];
	const user = useCurrentUser();
	const router = useRouter();
	const [input, setInput] = React.useState("");
	const [isPending, startTransition] = React.useTransition();
	const messagesRef = React.useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	//todo scroll for new message
	/* React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						scrollButton.current?.classList.remove("hide");
					} else {
						scrollButton.current?.classList.add("hide");
					}
				});
			},
			{ threshold: 0.4 }
		);
		if (messagesEndRef) {
			observer.observe(messagesEndRef);
			return () => {
				observer.unobserve(messagesEndRef);
			};
		}
	}, [messagesEndRef]); */

	const handleCreateChatByPrompt = async (content: string) => {
		setIsLoading(true);
		await createNewChat(user!.id as string, content).then((res) => {
			if (res.error) {
				toast.error(res.error);
				setIsLoading(false);
			} else if (res.chatID) {
				router.push(`/chat/${res.chatID}`);
				setIsLoading(false);
			}
		});
	};

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			if (chatID === "") {
				setIsLoading(true);
				await createNewChat(user!.id as string, input).then((res) => {
					if (res.error) {
						toast.error(res.error);
						setIsLoading(false);
					} else if (res.chatID) {
						setIsLoading(false);
						router.push(`/chat/${res.chatID}`);
					}
				});
				setInput("");
			}
			await sendUserMessage(user!.id as string, chatID, input).then(
				async (res) => {
					if (res?.error) {
						toast.error(res.error);
					}
				}
			);
			setInput("");
		});
	};

	return (
		<div className="relative">
			<div ref={messagesRef} className="space-y-5 mx-3">
				{messages &&
					messages.map((m) => (
						<div key={m.id} className="flex gap-2 py-6 relative">
							{m.role === "user" ? (
								<Avatar className="border-4 border-foreground/60 pointer-events-none cursor-pointer">
									{user.image ? (
										<AvatarImage src={user.image} />
									) : (
										<AvatarFallback>
											{user?.name
												?.charAt(0)
												.toUpperCase()}
										</AvatarFallback>
									)}
								</Avatar>
							) : (
								<Avatar className="border-4 border-primary cursor-pointer pointer-events-none">
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
			{chatID === "" && (
				<div className="max-w-3xl mx-auto px-3 pt-[50px]">
					<h1 className="text-3xl text-center font-bold">
						Niato<span className="text-primary">AI</span>
					</h1>
					<h2 className="text-xl font-semibold text-center my-3">
						Commencer à discuter avec l&#39;assistant
					</h2>
					{!isLoading && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
							{newChatOptions.map((option, index) => (
								<Card
									key={index}
									className="cursor-pointer hover:bg-foreground/5"
									onClick={() =>
										handleCreateChatByPrompt(option.content)
									}
								>
									<CardContent className="flex justify-center gap-3 flex-col items-center p-3 text-foreground/60">
										{option.icon}
										<span className="text-center">
											{option.title}
										</span>
									</CardContent>
								</Card>
							))}
						</div>
					)}
					{isLoading && (
						<div className="flex items-center justify-center mt-4	">
							<Loader2 size={35} className="animate-spin" />
						</div>
					)}
				</div>
			)}
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
