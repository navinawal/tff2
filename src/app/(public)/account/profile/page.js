import { getCurrentUser } from "@/app/actions/userAuth";
import { getUserProfile } from "@/app/actions/userProfile";
import { ProfileForm } from "@/components/Forms/Account/Profile";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Home() {
	const user = await getCurrentUser();
	const uid = user?.uid;
	const profile = await getUserProfile(uid);
	const defaultValues = {
		profileImage: profile.profileImage || "",
		firstName: profile.firstName || "",
		lastName: profile.lastName || "",
		email: profile.email || "",
		alternateEmail: profile.alternateEmail || "",
		phone: profile.phone || "",
		alternatePhone: profile.alternatePhone || "",
		dob: profile.dob ? new Date(profile.dob.seconds * 1000).toISOString().split("T")[0] : "",
		bio: profile.bio || "",
		gender: profile.gender || "",
	};
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center gap-4">
				<div>
					<h3 className="text-lg font-medium">Profile</h3>
					<p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
				</div>
				<Link href={`/team-members/${uid}`} className="text-[#2f2cd8]">
					View Public View
				</Link>
			</div>
			<Separator />
			<ProfileForm uid={uid} defaultValues={defaultValues} />
		</div>
	);
}
