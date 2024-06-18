import { getCurrentUser } from "@/app/actions/userAuth";
import { TeamMemberFilmographyForm } from "@/components/Forms/Account/TeamMemberFilmographyForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export async function FilmographySheet() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid } = user;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm" className="border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filmography</SheetTitle>
					<SheetDescription>Add your Filmography (Work Experiences)</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<TeamMemberFilmographyForm uid={uid} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
