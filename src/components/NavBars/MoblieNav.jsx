"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { headerNavMenus } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";

export default function MobileNav() {
	const { user, logout } = useAuth();
	if (!user) return;
	const { profileData } = user;

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
			router.refresh();
		} catch (error) {
			console.log(error.message);
			toast.error("something went wrong");
		}
	};

	return (
		<div className="flex flex-grow">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="flex flex-col flex-grow gap-6 text-lg font-medium pt-8">
						{user && (
							<>
								<Link href={`/team-members/${user?.teamMember?.uid || user?.company?.uid}`} className="hover:text-foreground">
									Profile
								</Link>
								<Link href={`/account/profile/change-password`} className="hover:text-foreground">
									Settings
								</Link>
							</>
						)}
						{headerNavMenus.map((link) => (
							<Link key={link.id} href={link.href} className="hover:text-foreground">
								{link.name}
							</Link>
						))}
						{user && (
							<Button
								variant={"link"}
								onClick={handleLogout}
								className="justify-start items-start ml-0 pl-0 mt-0 pt-0 text-lg flex-1 hover:text-foreground"
							>
								Logout
							</Button>
						)}
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex flex-1 ml-5">
				<Link href="/" className="flex items-center text-lg font-semibold md:text-base">
					<Image className="inline-block h-auto max-w-[300px]" alt="image" src="/logo_white.png" width="120" height="120" sizes="100vw"></Image>
				</Link>
			</div>
		</div>
	);
}
