import { getAllSavedTeamMembers } from "@/app/actions/companies";
import { getCurrentUser } from "@/app/actions/userAuth";
import TeamMemberCard from "@/components/Card/TeamMember";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function SavedTeamMembers() {
	const user = await getCurrentUser();

	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	const savedTeamMembers = await getAllSavedTeamMembers(uid);
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Saved TeamMembers</h3>
						<p className="text-sm text-muted-foreground">Saved Team Members</p>
					</div>
				</div>
				<Separator />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{savedTeamMembers?.map((teamMember) => (
						<TeamMemberCard key={teamMember.id} teamMember={teamMember}></TeamMemberCard>
					))}
				</div>
			</div>
		</>
	);
}
