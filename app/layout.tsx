import type { Metadata } from "next";
import { DM_Sans, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/react"

const dmsans = DM_Sans({ subsets: ["latin"] });
const spacegrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AI Playground",
	description:
		"Plateforme de messagerie instantanée optimisée par l'Intelligence Artificielle",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="fr">
			<body className={`${spacegrotesk.className} antialiased`}>
				<SessionProvider session={session}>
					<Providers>{children}</Providers>
					<Analytics/>
				</SessionProvider>
			</body>
		</html>
	);
}
