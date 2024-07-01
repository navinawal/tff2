import { fetchApplicationsForTeamMember } from "@/app/actions/jobApplications";
import { getCurrentUser } from "@/app/actions/userAuth";
import JobApplication from "@/components/Card/JobApplication";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function MyJobApplication() {
	const user = await getCurrentUser();

	if (!user || !user.profile) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return notFound();

	let jobApplications = [];
	try {
		jobApplications = await fetchApplicationsForTeamMember(uid);
	} catch (error) {
		console.error("Failed to fetch job applications:", error);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">My Job Applications</h3>
					<p className="text-sm text-muted-foreground">My Job Applications</p>
				</div>
			</div>
			<Separator />
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{jobApplications.length > 0 ? (
					jobApplications.map((jobApplication) => <JobApplication key={jobApplication.id} jobApplication={jobApplication} />)
				) : (
					<p>No job applications yet.</p>
				)}
			</div>
		</div>
	);
}
