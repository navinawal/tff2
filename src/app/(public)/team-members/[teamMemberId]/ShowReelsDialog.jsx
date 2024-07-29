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

import { Button } from "@/components/ui/button";
import { Edit2, PlusCircleIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { showReelsFormSchema } from "@/schemas/Schemas";
import { addShowReel, deleteShowReel, updateShowReel } from "@/app/actions/teamMemberShowReels";
import { zodResolver } from "@hookform/resolvers/zod";

import ShowReelForm from "./_components/show-reel-form";
import { FiLoader } from "react-icons/fi";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ShowReelsDialog({ teamMemberId, showReel }) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const formHook = useForm({
		resolver: zodResolver(showReelsFormSchema),
		defaultValues: showReel,
	});

	const {
		formState: { isSubmitting },
	} = formHook;

	if (!teamMemberId) return;

	async function onSubmit(formData) {
		try {
			const { showReelTimeStamps } = formData;

			showReelTimeStamps.forEach((showReelTimeStamp) => {
				const { hours, minutes, seconds } = showReelTimeStamp;
				const timestamp = formatToTimestamp(hours, minutes, seconds);
				showReelTimeStamp.timestamp = timestamp;
			});

			let response;

			if (showReel) {
				response = await updateShowReel(teamMemberId, showReel.id, formData);
			} else {
				response = await addShowReel(teamMemberId, formData);
			}

			if (response.success) {
				setOpenDialog(false);
				toast.success(response.message);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.error("Error uploading files:", error);
			toast.error("Something went wrong");
		}
	}

	const formatToTimestamp = (hours, minutes, seconds) => {
		const h = parseInt(hours, 10) || 0;
		const m = parseInt(minutes, 10) || 0;
		const s = parseInt(seconds, 10) || 0;
		return h * 3600 + m * 60 + s;
	};

	async function handleDelete(showReelId) {
		setLoading(true);
		try {
			const response = await deleteShowReel(teamMemberId, showReelId);

			if (response.success) {
				toast.success(response.message);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.error("Error :", error);
			toast.error("Something went wrong");
		}
		setLoading(false);
	}

	if (isDesktop)
		return (
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild className="flex justify-center items-center gap-2">
					{showReel ? (
						<Button variant="outline" size="icon">
							<Edit2 className="h-4 w-4" />
						</Button>
					) : (
						<Button variant="outline" size="icon">
							<PlusCircleIcon className="h-4 w-4" />
						</Button>
					)}
				</DialogTrigger>
				{showReel && (
					<Button variant="outline" size="icon" onClick={() => handleDelete(showReel.id)} disabled={loading}>
						{loading ? <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
					</Button>
				)}
				<DialogContent className="max-w-[400px] md:max-w-[800px]">
					<DialogHeader>
						<DialogTitle className="text-center">Add Portfolio / Showreel</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<ShowReelForm formHook={formHook} onSubmit={onSubmit} className="w-full">
						<DialogFooter className="gap-2 p-5">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={isSubmitting}>
								{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
								{isSubmitting ? "Submitting data ..." : "Submit"}
							</Button>
						</DialogFooter>
					</ShowReelForm>
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild className="flex justify-center items-center gap-2">
				{showReel ? (
					<Button variant="outline" size="icon">
						<Edit2 className="h-4 w-4" />
					</Button>
				) : (
					<Button variant="outline" size="icon">
						<PlusCircleIcon className="h-4 w-4" />
					</Button>
				)}
			</DialogTrigger>
			{showReel && (
				<Button variant="outline" size="icon" onClick={() => handleDelete(showReel.id)} disabled={loading}>
					{loading ? <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
				</Button>
			)}
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Add Portfolio / Showreel</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<ShowReelForm formHook={formHook} onSubmit={onSubmit} className="w-full">
					<DialogFooter className="gap-2 p-5">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={isSubmitting}>
							{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
							{isSubmitting ? "Submitting data ..." : "Submit"}
						</Button>
					</DialogFooter>
				</ShowReelForm>
			</DrawerContent>
		</Drawer>
	);
}
