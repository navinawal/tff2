import { getCurrentUser } from "@/app/actions/userAuth";
import { JobApplicationFrom } from "@/components/Forms/Account/JobApplicationForm";
import { Separator } from "@/components/ui/separator";

export default async function ApplyForJob({ searchParams }) {
	const { companyId, jobPostId } = searchParams;
	const user = await getCurrentUser();

	if (!user) return;

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return;

	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Job Application</h3>
					<p className="text-sm text-muted-foreground">Please fill your details.</p>
				</div>
				<Separator />
				<JobApplicationFrom teamMemberId={uid} companyId={companyId} jobPostId={jobPostId} />
			</div>
		</>
	);
}
