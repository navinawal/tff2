import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body className={cn("relative min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
				<main className="h-screen bg-[#f6f9fc]">{children}</main>
			</body>
		</html>
	);
}
