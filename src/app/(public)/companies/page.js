import AppMaxWidthContainer from "@/components/ui/max-width-container";
import CompaniesDataGrid from "./companies-data-grid";

export default function Companies() {
	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="flex items-center justify-between space-y-2">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Companies</h2>
							<p className="text-muted-foreground">Here&apos;s a list of Company for our network!</p>
						</div>
					</div>
					<CompaniesDataGrid />
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
