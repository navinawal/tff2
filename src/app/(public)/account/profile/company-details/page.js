import { CompanyDetailsForm } from "@/components/Forms/Account/CompanyDetails";
import { Separator } from "@/components/ui/separator";

export default function CompanyDetails() {
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
				<CompanyDetailsForm />
			</div>
		</>
	);
}
