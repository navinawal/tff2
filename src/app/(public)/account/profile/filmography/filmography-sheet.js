"use client";
import { TeamMemberFilmographyForm } from "@/components/Forms/Account/TeamMemberFilmographyForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export function FilmographySheet({ teamMemberId, filmographyId, isOpen, setIsOpen }) {
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filmography</SheetTitle>
					<SheetDescription>Add your Filmography (Work Experiences)</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<TeamMemberFilmographyForm teamMemberId={teamMemberId} filmographyId={filmographyId} onSuccess={handleClose} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
