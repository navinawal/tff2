"use client";
import { TeamMemberTrainingForm } from "@/components/Forms/Account/TeamMemberTrainingForm";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function TrainingsSheet({ teamMemberId, training, open, onOpenChange }) {
	return (
		<Sheet onOpenChange={onOpenChange} open={open}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{training ? "Edit Training" : "Add New Training"}</SheetTitle>
					<SheetDescription>Trainings And Affiliations</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<TeamMemberTrainingForm teamMemberId={teamMemberId} training={training} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
