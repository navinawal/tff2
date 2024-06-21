import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrainingsSheet } from "../trainings/trainings-sheet";
import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";

export default async function Trainings() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid } = user;

	const trainings = await getTeamMemberTrainings(uid);

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
				{!trainings.error ? (
					trainings?.map((training) => (
						<div className="flex" key={training.id}>
							<Card>
								<CardHeader>
									<CardTitle>{training.instituition}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{training.courseLength}</p>
									<p>{training.mentor}</p>
									<p>{training.courseTaken}</p>
								</CardContent>
							</Card>
						</div>
					))
				) : (
					<div className="flex justify-center items-center min-h-96">
						<h1>No record</h1>
					</div>
				)}
			</div>
		</>
	);
}
