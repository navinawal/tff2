"use client";
import { TeamMemberFilmographyForm } from "@/components/Forms/Account/TeamMemberFilmographyForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function FilmographySheet({ uid }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
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
					<TeamMemberFilmographyForm uid={uid} onSuccess={handleClose} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
