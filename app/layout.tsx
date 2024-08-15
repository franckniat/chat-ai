import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Playground",
  description: "Plateforme de messagerie instantanée optimisée par l'Intelligence Artificielle",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="fr">
      <body className={`${dmsans.className} antialiased`}>
        <SessionProvider session={session}>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
