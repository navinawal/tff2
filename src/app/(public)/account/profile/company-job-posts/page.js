import { Separator } from "@/components/ui/separator";

export default function CompanyJobPosts() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Job Posts</h3>
						<p className="text-sm text-muted-foreground">Add Company Job Posts</p>
					</div>
				</div>
				<Separator />
			</div>
		</>
	);
}
