import { getTeamMemberDetails } from "@/app/actions/team_members";
import { getCurrentUser } from "@/app/actions/userAuth";
import { TeamMemberBasicInfoForm } from "@/components/Forms/Account/TeamMemberBasicInfoForm";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function TeamMemberBasicInfo() {
	const user = await getCurrentUser();

	if (!user) notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") notFound();

	const teamMemberProfile = await getTeamMemberDetails(uid);

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center gap-2">
					<div>
						<h3 className="text-lg font-medium">Basic Info</h3>
						<p className="text-sm text-muted-foreground">Complete your basic TeamMember Basic Info.</p>
					</div>
				</div>
				<Separator />
				<TeamMemberBasicInfoForm uid={uid} defaultValues={teamMemberProfile} />
			</div>
		</>
	);
}
