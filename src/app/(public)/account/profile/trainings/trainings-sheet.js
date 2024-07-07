import { getCurrentUser } from "@/app/actions/userAuth";
import { TeamMemberTrainingForm } from "@/components/Forms/Account/TeamMemberTrainingForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export async function TrainingsSheet({ isOpen, onClose, trainingData }) {
	const user = await getCurrentUser();

	if (!user) return null;

	const { uid } = user;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetTrigger asChild>
				<Button size="sm" className="border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{trainingData ? "Edit Training" : "Add New Training"}</SheetTitle>
					<SheetDescription>Trainings And Affiliations</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<TeamMemberTrainingForm uid={uid} defaultValues={trainingData} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
