import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/Account/sidebar-nav";
import AppMaxWidthContainer from "@/components/ui/max-width-container";

export const metadata = {
	title: "Account Profile",
	description: ".",
};

export default function SettingsLayout({ children }) {
	return (
		<AppMaxWidthContainer>
			<div className="py-28">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
					<p className="text-muted-foreground">Manage your account settings and User Role settings.</p>
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
