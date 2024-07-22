"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";

export default function GalleryEditorDialog({ openDialog, onClose, children }) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [open, setOpenDialog] = useState(openDialog);

	useEffect(() => {
		setOpenDialog(openDialog);
	}, [openDialog]);

	if (isDesktop)
		return (
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-center">Add Portfolio / Showreel</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className="relative p-5 min-h-[400px]">{children}</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={open} onOpenChange={setOpenDialog}>
			<DrawerTrigger asChild className="flex justify-center items-center gap-2"></DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add Portfolio / Showreel</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				{children}
				<DrawerFooter>
					<DrawerClose onClick={onClose}>Close</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
