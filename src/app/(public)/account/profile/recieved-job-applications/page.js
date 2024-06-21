import { Separator } from "@/components/ui/separator";

export default function RecievedJobApplications() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Recieved Job Applications</h3>
						<p className="text-sm text-muted-foreground">Recieved Job Applications</p>
					</div>
				</div>
				<Separator />
			</div>
		</>
	);
}
