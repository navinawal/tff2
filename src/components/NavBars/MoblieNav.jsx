"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { headerNavMenus } from "@/config/site";

export default function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0">
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
	);
}
