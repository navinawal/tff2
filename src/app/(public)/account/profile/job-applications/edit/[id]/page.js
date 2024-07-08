import { getJobApplication } from "@/app/actions/jobApplications";
import { getCurrentUser } from "@/app/actions/userAuth";
import { JobApplicationFrom } from "@/components/Forms/Account/JobApplicationForm";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function EditJobApplication({ params }) {
	const { id: jobApplicationId } = params;
	const user = await getCurrentUser();

	if (!user) return;

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return notFound();

	const jobApplicationData = await getJobApplication(jobApplicationId);

	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Job Application</h3>
					<p className="text-sm text-muted-foreground">Please fill your details.</p>
				</div>
				<Separator />
				<JobApplicationFrom teamMemberId={uid} jobApplicationId={jobApplicationId} defaultValues={jobApplicationData} />
			</div>
		</>
	);
}
