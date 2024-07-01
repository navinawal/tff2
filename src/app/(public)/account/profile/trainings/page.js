import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrainingsSheet } from "../trainings/trainings-sheet";
import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";
import Loading from "./loading";
import { notFound } from "next/navigation";

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
				<div className="grid grid-cols-4 gap-5">
					{!trainings?.error && trainings?.length > 0 ? (
						trainings?.map((training) => (
							<Card key={training.id}>
								<CardHeader>
									<CardTitle>{training.instituition}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{training.courseLength}</p>
									<p>{training.mentor}</p>
									<p>{training.courseTaken}</p>
								</CardContent>
							</Card>
						))
					) : (
						<div className="flex justify-center items-center min-h-96">
							<h1>No record</h1>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
