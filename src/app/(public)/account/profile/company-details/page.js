import { getCompanyProfile } from "@/app/actions/companies";
import { getCurrentUser } from "@/app/actions/userAuth";
import { CompanyDetailsForm } from "@/components/Forms/Account/CompanyDetails";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function CompanyDetails() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	const companyProfile = (await getCompanyProfile(uid)) ?? {};

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Company Details</h3>
						<p className="text-sm text-muted-foreground">Add your Company Details</p>
					</div>
				</div>
				<Separator />
				<CompanyDetailsForm uid={uid} defaultValues={companyProfile} />
			</div>
		</>
	);
}
