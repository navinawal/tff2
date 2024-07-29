"use client";
import AuthButtons from "@/components/Auth/AuthButtons/AuthButton";
import DesktopNav from "@/components/NavBars/DesktopNav";
import MobileNav from "@/components/NavBars/MoblieNav";
import UserNav from "@/components/Account/user-nav";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { NavigationMenuDemo } from "./NavigationMenu";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AppHeader() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { user, loading } = useAuth();

	return (
		<header className="sticky top-0 border-b border-primary-gray bg-[#181a1c] z-[9]">
			<div className="container flex items-center gap-4 h-16">
				{/* {isDesktop ? <DesktopNav /> : <MobileNav />} */}
				{isDesktop ? <NavigationMenuDemo /> : <MobileNav />}
				{/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<div className="ml-auto flex-initial">{loading ? <Skeleton className="h-8 w-8 rounded-full" /> : user ? <UserNav /> : <AuthButtons />}</div>
				</div> */}
			</div>
		</header>
	);
}
