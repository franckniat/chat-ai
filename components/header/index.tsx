"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlignJustify, MessageCirclePlus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { logout } from "@/actions/auth";
import { Chat } from "@prisma/client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { usePathname } from "next/navigation";

export default function Navigation({ chats }: { chats?: Chat[] }) {
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();
	const handleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	const handleLogout = async () => {
		await logout();
	};

	return (
		<>
			<nav className="fixed bg-background/80 backdrop-blur border-b border-foreground/5 w-full z-50">
				<section className="px-4 text-sm mx-auto">
					<section className="flex items-center justify-between h-[65px]">
						<div className="flex gap-4 items-center">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant={"ghost"} size={"icon"}>
										<AlignJustify />
									</Button>
								</SheetTrigger>
								<SheetContent side={"left"}>
									<SheetHeader>
										<SheetTitle>Discussions</SheetTitle>
										<SheetDescription>
											Accédez à vos discussions.
										</SheetDescription>
									</SheetHeader>
									<aside className="flex flex-col h-[calc(100dvh-100px)] overflow-y-auto justify-between relative">
										<div className="flex flex-col gap-1">
											<SheetClose asChild>
												<Link
													href={`/chat`}
													className="text-sm font-medium my-1"
												>
													<Button
														className="w-full gap-2"
														variant={"outline"}
													>
														<MessageCirclePlus
															size={18}
														/>{" "}
														Nouveau chat
													</Button>
												</Link>
											</SheetClose>
											{chats?.map((chat, index) => (
												<SheetClose key={index} asChild>
													<Link
														href={`/chat/${chat.id}`}
														className={`text-sm font-medium hover:bg-foreground/5 rounded-md px-3 py-3 ${
															pathname ===
																`/chat/${chat.id}` &&
															"bg-foreground/5 text-primary"
														}`}
													>
														<span>
															{chat.name.replace(
																'"',
																""
															)}
														</span>
													</Link>
												</SheetClose>
											))}
										</div>
										<div className=" absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-background to-transparent"></div>
										<Button
											title="Se déconnecter"
											variant="outline"
											onClick={handleLogout}
											className="absolute bottom-2 w-full"
										>
											Se déconnecter
										</Button>
									</aside>
								</SheetContent>
							</Sheet>
							<Link href={"/chat"}>
								<h1 className="text-2xl text-center font-bold flex gap-1">
									AI <span className="text-primary">Chat</span>
								</h1>
							</Link>
						</div>
						<div className="flex items-center gap-3">
							<Button
								className="relative"
								variant="ghost"
								size="icon"
								onClick={handleTheme}
							>
								<Moon
									className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition"
									size={20}
								/>
								<Sun
									className="scale-100 dark:scale-0 rotate-45 dark:rotate-0 transition absolute"
									size={20}
								/>
							</Button>
							<div className="hidden md:flex gap-2">
								<Button
									title="Se déconnecter"
									variant="outline"
									onClick={handleLogout}
								>
									Se déconnecter
								</Button>
							</div>
						</div>
					</section>
				</section>
			</nav>
		</>
	);
}
