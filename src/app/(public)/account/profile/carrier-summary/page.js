import { CarrierSummaryForm } from "@/components/Forms/Account/CarrierSummary";
import { Separator } from "@/components/ui/separator";

export default function CarrierSummary() {
	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Carrier Summary</h3>
					<p className="text-sm text-muted-foreground">Please include an approximate count of your projects.</p>
				</div>
				<Separator />
				<CarrierSummaryForm />
			</div>
		</>
	);
}
