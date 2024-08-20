import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default function PublicLayout({ children }) {
	return (
		<div className="relative flex min-h-screen flex-col bg-background">
			{<AppHeader />}
			<main className="flex-grow flex-1">{children}</main>
			{<AppFooter />}
		</div>
	);
}