"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/menu-button";
import { useAuth } from "@/hooks/useAuth";
import { commonNavMenus, userNavMenus } from "@/config/navMenus";

export function SidebarNav({ className }) {
	const pathname = usePathname();
	const { user } = useAuth();

	if (!user) {
		return (
			<nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
				<Skeleton count={7} height={20} />
			</nav>
		);
	}

	const { profileData } = user;
	const roleMenus = userNavMenus[profileData?.role] || [];
	const sidebarNavItems = [...commonNavMenus, ...roleMenus];

	return (
		<nav className={cn("flex flex-wrap space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
			{sidebarNavItems.map((item) => (
				<Link
					key={item.id}
					href={item.url}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						pathname === item.url ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
						"justify-start"
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}

export function Skeleton({ count = 1 }) {
	return (
		<div>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="animate-pulse rounded bg-muted h-8" style={{ marginBottom: "8px", borderRadius: "4px" }}></div>
			))}
		</div>
	);
}
