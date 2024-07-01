import { getCurrentUser } from "@/app/actions/userAuth";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import SaveJobGrid from "./saved-job-grid";

export default async function SavedJobs() {
	const user = await getCurrentUser();

	if (!user || !user.profile) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return notFound();

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
				<SaveJobGrid uid={uid} />
			</div>
		</>
	);
}
