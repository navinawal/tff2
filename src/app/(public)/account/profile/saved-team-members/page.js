import { Separator } from "@/components/ui/separator";

export default function SavedTeamMembers() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Save Members</h3>
						<p className="text-sm text-muted-foreground">Saved Team Members</p>
					</div>
				</div>
				<Separator />
			</div>
		</>
	);
}
