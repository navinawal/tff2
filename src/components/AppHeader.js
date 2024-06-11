"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { headerNavMenus } from "@/config/site";
import AuthButtons from "@/components/Auth/AuthButtons/AuthButton";
import { UserNav } from "@/components/Account/user-nav";
import { useAuth } from "@/hooks/useAuth";

export default function AppHeader() {
	const { user } = useAuth();
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b border-primary-gray bg-[#181a1c] px-4 md:px-6 z-[9]">
			<nav className="w-full hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
				<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Image className="inline-block h-auto max-w-[376px]" alt="image" src="/logo_black.png" width="150" height="150" sizes="100vw"></Image>
				</Link>
				{headerNavMenus.map((link) => (
					<Link key={link.id} href={link.href} className="text-slate-50 transition-colors hover:text-foreground">
						{link.name}
					</Link>
				))}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden bg-primary">
						<Menu className="h-5 w-5 text-primary-foreground" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="bg-primary">
					<nav className="grid gap-6 text-lg font-medium text-primary-foreground pt-16">
						{headerNavMenus.map((link) => (
							<Link key={link.id} href={link.href} className="text-primary-foreground hover:text-foreground">
								{link.name}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<div className="ml-auto flex-initial">{user ? <UserNav /> : <AuthButtons />}</div>
			</div>
		</header>
	);
}
