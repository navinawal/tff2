"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { headerNavMenus } from "@/config/site";
import AuthButtons from "@/components/Auth/AuthButtons/AuthButton";
import { UserNav } from "@/components/Account/user-nav";
import { getCurrentUser } from "@/app/actions/userAuth";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppHeader() {
	const { user, loading } = useAuth();

	return (
		<header className="sticky top-0 border-b border-primary-gray bg-[#181a1c] px-4 md:px-6 z-[9]">
			<div className="container flex items-center gap-4 h-16">
				<nav className="w-full hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center md:gap-5 md:text-sm lg:gap-6 whitespace-nowrap">
					<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<Image className="inline-block h-auto max-w-[300px]" alt="image" src="/logo_white.png" width="120" height="120" sizes="100vw"></Image>
					</Link>
					{headerNavMenus.map((link) => (
						<Link key={link.id} href={link.href} className="text-slate-50 transition-colors hover:text-foreground">
							{link.name}
						</Link>
					))}
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<Link href="/" className="flex items-center text-lg font-semibold md:text-base">
							<Image className="inline-block h-auto max-w-[300px]" alt="image" src="/logo_white.png" width="120" height="120" sizes="100vw"></Image>
						</Link>
						<nav className="grid gap-6 text-lg font-medium pt-8">
							{headerNavMenus.map((link) => (
								<Link key={link.id} href={link.href} className="hover:text-foreground">
									{link.name}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<div className="ml-auto flex-initial">{loading ? <Skeleton className="h-8 w-8 rounded-full" /> : user ? <UserNav /> : <AuthButtons />}</div>
				</div>
			</div>
		</header>
	);
}
