import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberFilmographies } from "@/app/actions/teamFilmography";
import { notFound } from "next/navigation";
import { FilmographyDataTable } from "./filmography-data-table";

export default async function Filmography() {
	const user = await getCurrentUser();

	if (!user || !user.profile) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return notFound();

	const filmographies = await getTeamMemberFilmographies(uid);

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Filmography</h3>
						<p className="text-sm text-muted-foreground">Add your Filmography (Work Experiences)</p>
					</div>
				</div>
				<Separator />
				<div className="block">
					<FilmographyDataTable teamMemberId={uid} filmographies={filmographies} />
				</div>
			</div>
		</>
	);
}
