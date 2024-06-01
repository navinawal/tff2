import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "TeamForFilm | Home",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body className={cn("relative min-h-screen bg-slate-50 font-sans antialiased flex flex-col", fontSans.variable)}>
				<div className="relative flex flex-col h-full w-full min-h-screen">
					<AppHeader />
					<main className="flex-grow flex-1">{children}</main>
					<AppFooter />
				</div>
			</body>
		</html>
	);
}
