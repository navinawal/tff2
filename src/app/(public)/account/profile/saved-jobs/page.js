import { Separator } from "@/components/ui/separator";

export default function SavedJobs() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Saved Jobs</h3>
						<p className="text-sm text-muted-foreground">My Saved Jobs</p>
					</div>
				</div>
				<Separator />
			</div>
		</>
	);
}
