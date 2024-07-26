"use client";

import { headerNavMenus } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export default function DesktopNav() {
	return (
		<nav className="w-full flex items-center gap-5 font-medium whitespace-nowrap">
			<Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Image className="inline-block h-auto max-w-[300px]" alt="image" src="/logo_white.png" width="120" height="120" sizes="100vw"></Image>
			</Link>
			{headerNavMenus.map((link) => (
				<Link key={link.id} href={link.href} className="text-slate-50 transition-colors hover:text-foreground">
					{link.name}
				</Link>
			))}
		</nav>
	);
}
