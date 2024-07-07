import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/Account/sidebar-nav";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { getCurrentUser } from "@/app/actions/userAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
	title: "Account Profile",
	description: ".",
};

export default async function SettingsLayout({ children }) {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid, profile } = user;

	return (
		<AppMaxWidthContainer>
			<div className="py-28">
				<div className="flex justify-between items-center space-y-0.5">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
						<p className="text-muted-foreground">Manage your account settings and User Role settings.</p>
					</div>
					{profile.role === "TeamMember" ? (
						<Button asChild size="sm">
							<Link href={`/team-members/${uid}`}>Public View</Link>
						</Button>
					) : profile.role === "Company" ? (
						<Button asChild size="sm">
							<Link href={`/companies/${uid}`}>Public View</Link>
						</Button>
					) : null}
				</div>
				<Separator className="my-6" />
				<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
					<aside className="lg:w-1/5">
						<SidebarNav />
					</aside>
					<div className="flex-1">{children}</div>
				</div>
			</div>
		</AppMaxWidthContainer>
	);
}
