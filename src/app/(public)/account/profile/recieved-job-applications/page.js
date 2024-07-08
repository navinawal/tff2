import { fetchJobApplicationsForCompany } from "@/app/actions/jobApplications";
import { getCurrentUser } from "@/app/actions/userAuth";
import JobApplication from "@/components/Card/JobApplication";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function RecievedJobApplications() {
	const user = await getCurrentUser();

	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	const jobApplications = await fetchJobApplicationsForCompany(uid);

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Recieved Job Applications</h3>
						<p className="text-sm text-muted-foreground">Recieved Job Applications</p>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{jobApplications?.map((jobApplication) => (
						<JobApplication key={jobApplication.id} user={user} jobApplication={jobApplication}></JobApplication>
					))}
				</div>
				<Separator />
			</div>
		</>
	);
}
