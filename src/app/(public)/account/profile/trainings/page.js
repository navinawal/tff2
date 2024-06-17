import { Separator } from "@/components/ui/separator";
import { TrainingsSheet } from "../trainings/trainings-sheet";

export default function Trainings() {
	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Trainings</h3>
						<p className="text-sm text-muted-foreground">Trainings And Affiliations</p>
					</div>
					<TrainingsSheet />
				</div>
				<Separator />
			</div>
		</>
	);
}
