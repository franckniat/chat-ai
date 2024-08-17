import { Button } from "@/components/ui/button";
import SwitchTheme from "@/components/ui/switch-theme";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/components/auth-button";

export default function Home() {

  return (
    <main className="px-3 max-w-[1200px] mx-auto">
      <div className="flex items-center h-screen">
        <div className="text-center pt-[60px] max-w-[1000px] mx-auto  leading-snug sm:leading-relaxed">
          <h1 className="text-3xl lg:text-6xl  font-extrabold bg-gradient-to-r from-primary via-foreground/60 dark:via-foreground/40 to-primary/50 bg-clip-text text-transparent tracking-tighter">
            Chatbox interactive optimisée par l&#039; Intelligence Artificielle</h1>
          <p className="text-2xl lg:text-3xl font-bold mt-3 text-foreground/70 dark:text-foreground/50">
            Expérimentez une nouvelle façon de communiquer avec une IA.
          </p>
          <p className="text-base md:text-lg mt-5 font-medium text-foreground/70">
            Notre chatbox utilise des algorithmes avancés pour offrir des réponses intelligentes et personnalisées à vos questions. Que vous ayez besoin d&#039;aide, de conseils ou simplement envie de discuter, notre chatbox est là pour vous. Essayez-la dès maintenant et découvrez la puissance de l&#039;IA dans la communication.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-10">
            <Link href="/auth/login" className="w-full sm:w-fit">
              <Button size={"xl"} className="gap-2 w-full sm:w-fit">
                🚀 Se connecter
              </Button>
            </Link>
            <Link href="https://github.com/franckniat" target="_blank" className="w-full sm:w-fit">
              <Button variant={"outline"} size={"xl"} className="gap-2 w-full sm:w-fit">
                <CircleAlert size={20} />
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute top-2 right-2 sm:top-5 sm:right-5">
          <SwitchTheme />
        </div>
      </div>
    </main>
  );
}
