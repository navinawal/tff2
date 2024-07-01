import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FilmographySheet } from "./filmography-sheet";
import { getCurrentUser } from "@/app/actions/userAuth";
import { getTeamMemberFilmographies } from "@/app/actions/teamFilmography";
import { notFound } from "next/navigation";

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
					<FilmographySheet uid={uid} />
				</div>
				<Separator />
				<div className="grid grid-cols-4 gap-5">
					{!filmographies?.error && filmographies?.length > 0 ? (
						filmographies?.map((filmography) => (
							<Card key={filmography.id}>
								<CardHeader>
									<CardTitle>{filmography.projectName}</CardTitle>
								</CardHeader>
								<CardContent>
									<p>{filmography.projectType}</p>
									<p>{filmography.role}</p>
									<p>{filmography.productionYear}</p>
									<p>{filmography.projectLink}</p>
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
