import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package2 } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut } from "@/auth";
import { publicLinks } from "@/lib/app.config";

export default async function AppHeader() {
	const session = await auth();
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="w-full hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
					<Image className="inline-block h-auto max-w-[376px]" alt="image" src="/logo_black.png" width="150" height="150" sizes="100vw"></Image>
				</Link>
				{publicLinks.map((link) => (
					<Link key={link.id} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
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
					<nav className="grid gap-6 text-lg font-medium">
						<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						<Link href="/" className="hover:text-foreground">
							Home
						</Link>
						<Link href="/" className="text-muted-foreground hover:text-foreground">
							About
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<div className="ml-auto flex-initial">
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" size="icon" className="rounded-full">
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<form
										action={async () => {
											"use server";
											await signOut();
										}}
									>
										<button type="submit">Sign Out</button>
									</form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex h-5 items-center space-x-4 text-sm">
							<Button asChild variant="ghost">
								<Link href="/login">Login</Link>
							</Button>
							<Separator orientation="vertical" />
							<Button asChild variant="ghost">
								<Link href="/login">Register</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
