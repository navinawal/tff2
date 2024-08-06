"use client";
import DesktopNav from "@/components/NavBars/DesktopNav";
import MobileNav from "@/components/NavBars/MoblieNav";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import AppMaxWidthContainer from "./ui/max-width-container";

export default function AppHeader() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	return (
		<header className="sticky top-0 border-b border-primary-gray bg-[#181a1c] z-[9]">
			<AppMaxWidthContainer>
				<div className="flex items-center gap-4 h-16">{isDesktop ? <DesktopNav /> : <MobileNav />}</div>
			</AppMaxWidthContainer>
		</header>
	);
}
