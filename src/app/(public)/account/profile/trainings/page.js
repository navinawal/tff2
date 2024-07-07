import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrainingsSheet } from "../trainings/trainings-sheet";
import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";
import Loading from "./loading";
import { notFound } from "next/navigation";
import { TrainingsDataTable } from "./trainings-data-table";

export default async function Trainings() {
	const user = await getCurrentUser();

	if (!user || !user.profile) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "TeamMember") return notFound();

	const trainings = await getTeamMemberTrainings(uid);

	if (!trainings) return Loading();

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Trainings</h3>
						<p className="text-sm text-muted-foreground">Trainings And Affiliations</p>
					</div>
					<TrainingsSheet />
				</div>
				<Separator />
				<div className="block">
					<TrainingsDataTable trainings={trainings} />
				</div>
			</div>
		</>
	);
}
