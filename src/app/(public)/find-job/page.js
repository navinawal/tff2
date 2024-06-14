import AppMaxWidthContainer from "@/components/ui/max-width-container";
import JobsDataGrid from "./jobs-data-grid";

export default function FindJob() {
	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="flex items-center justify-between space-y-2">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Jobs</h2>
							<p className="text-muted-foreground">Here&apos;s a list of Job in our network!</p>
						</div>
					</div>
					<JobsDataGrid />
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
