import { getCurrentUser } from "@/app/actions/userAuth";
import { getUserProfile } from "@/app/actions/users_profile";
import { ProfileForm } from "@/components/Forms/Account/Profile";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid } = user;

	let defaultValues = {};

	const response = await getUserProfile(uid);

	if (response.success) {
		defaultValues = response.data;
		// defaultValues.dob = defaultValues.dob ? new Date(defaultValues.dob._seconds * 1000).toISOString().split("T")[0] : "";
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center gap-4">
				<div>
					<h3 className="text-lg font-medium">Profile</h3>
					<p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
				</div>
			</div>
			<Separator />
			<ProfileForm uid={uid} defaultValues={defaultValues} />
		</div>
	);
}
