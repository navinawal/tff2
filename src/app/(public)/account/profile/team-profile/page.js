import { getTeamMemberDetails } from "@/app/actions/teamMembers";
import { getCurrentUser } from "@/app/actions/userAuth";
import { TeamMemberBasicInfoForm } from "@/components/Forms/Account/TeamMemberBasicInfoForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TeamMemberBasicInfo() {
	const user = await getCurrentUser();

	if (!user) notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") notFound();

	const companyProfile = await getTeamMemberDetails(uid);

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center gap-2">
					<div>
						<h3 className="text-lg font-medium">Basic Info</h3>
						<p className="text-sm text-muted-foreground">Complete your basic TeamMember Basic Info.</p>
					</div>
					<Button asChild size="sm">
						<Link href={`/team-members/${uid}`}>Public View</Link>
					</Button>
				</div>
				<Separator />
				<TeamMemberBasicInfoForm uid={uid} defaultValues={companyProfile} />
			</div>
		</>
	);
}
