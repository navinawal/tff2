import { getCurrentUser } from "@/app/actions/userAuth";
import { CarrierSummaryForm } from "@/components/Forms/Account/CarrierSummary";
import { Separator } from "@/components/ui/separator";
import { adminDb } from "@/lib/firebase-admin";

export default async function CarrierSummary() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid } = user;

	const carrierSummaryRef = adminDb.collection("team_members").doc(uid);
	const carrierSummaryDoc = await carrierSummaryRef.get();
	const carrierSummary = carrierSummaryDoc.data();

	const defaultValues = {
		featureFilms: carrierSummary.featureFilms || "",
		shortFilms: carrierSummary.shortFilms || "",
		musicVideos: carrierSummary.musicVideos || "",
		documentaries: carrierSummary.documentaries || "",
		commercials: carrierSummary.commercials || "",
		theatreDrama: carrierSummary.theatreDrama || "",
		webSeries: carrierSummary.webSeries || "",
	};

	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Carrier Summary</h3>
					<p className="text-sm text-muted-foreground">Please include an approximate count of your projects.</p>
				</div>
				<Separator />
				<CarrierSummaryForm uid={uid} defaultValues={defaultValues} />
			</div>
		</>
	);
}
