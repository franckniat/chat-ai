"use client"
import { useTheme } from "next-themes";
import { Switch } from "./switch";
import { Moon, Sun } from "lucide-react";

export default function SwitchTheme() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="px-3 flex items-center gap-2">
            <div className="relative flex items-center">
                <Sun className="scale-100 dark:scale-0 rotate-0 dark:rotate-45 transition-transform"
                    size={20} />
                <Moon
                    className="scale-0 dark:scale-100 rotate-45 dark:rotate-0 transition-transform absolute"
                    size={20} />
            </div>
            <Switch
                checked={theme === "dark"}
                onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
        </div>
    )
}
