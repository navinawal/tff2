import { getCurrentUser } from "@/app/actions/userAuth";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { JobPostSheet } from "./job-post-sheet";

export default async function CompanyJobPosts() {
	const user = await getCurrentUser();
	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Job Posts</h3>
						<p className="text-sm text-muted-foreground">Add Company Job Posts</p>
					</div>
					<JobPostSheet uid={uid} />
				</div>
				<Separator />
			</div>
		</>
	);
}
