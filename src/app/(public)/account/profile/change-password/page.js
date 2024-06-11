import { ChangePasswordForm } from "@/components/Forms/Account/ChangePassword";
import { Separator } from "@/components/ui/separator";

export default function ChangePassword() {
	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Change Password</h3>
					<p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
				</div>
				<Separator />
				<ChangePasswordForm />
			</div>
		</>
	);
}
