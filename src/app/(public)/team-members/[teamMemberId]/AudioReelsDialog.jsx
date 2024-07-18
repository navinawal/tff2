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
import { useForm } from "react-hook-form";

import { Edit2, PlusCircleIcon, Trash2 } from "lucide-react";
import { useState } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "sonner";
import { audioReelsFormSchema } from "@/schemas/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAudioReel, deleteAudioReel, updateAudioReel } from "@/app/actions/audio-reels";
import { FiLoader } from "react-icons/fi";
import AudioReelForm from "./_components/audio-reel-form";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AudioReelsDialog({ teamMemberId, audioReel }) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const formHook = useForm({
		resolver: zodResolver(audioReelsFormSchema),
		defaultValues: {
			soundTrackTitle: audioReel?.soundTrackTitle || "",
			soundTrack: audioReel?.soundTrack || "",
			description: audioReel?.description || "",
		},
	});

	if (!teamMemberId) return;

	const {
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		try {
			let soundTrackUrl = formData.soundTrack;

			if (formData.soundTrack instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/team_members/audio_reels/${teamMemberId}/${Date.now()}-${formData.soundTrack.name}`);
				const snapshot = await uploadBytes(storageRef, formData.soundTrack);
				soundTrackUrl = await getDownloadURL(snapshot.ref);
			}

			let response;
			if (audioReel) {
				if (formData.soundTrack instanceof File && audioReel.soundTrack) {
					// Delete the previous file from Firebase Storage
					const storage = getStorage();
					const fileRef = ref(storage, audioReel.soundTrack);
					await deleteObject(fileRef);
				}
				response = await updateAudioReel(teamMemberId, audioReel.id, {
					...formData,
					soundTrack: soundTrackUrl,
				});
			} else {
				response = await addAudioReel(teamMemberId, {
					...formData,
					soundTrack: soundTrackUrl,
				});
			}

			if (response.success) {
				formHook.reset();
				toast.success(response.message);
				setOpenDialog(false);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.error("Error uploading files:", error.message);
			toast.error("Something went wrong");
		}
	}

	async function handleDelete(audioReelId, soundTrack) {
		setLoading(true);
		try {
			if (soundTrack) {
				// Delete the file from Firebase Storage
				const storage = getStorage();
				const fileRef = ref(storage, soundTrack);
				await deleteObject(fileRef);
			}
			const response = await deleteAudioReel(teamMemberId, audioReelId);

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
					{audioReel ? (
						<Button variant="outline" size="icon">
							<Edit2 className="h-4 w-4" />
						</Button>
					) : (
						<Button variant="outline" size="icon">
							<PlusCircleIcon className="h-4 w-4" />
						</Button>
					)}
				</DialogTrigger>
				{audioReel && (
					<Button variant="outline" size="icon" onClick={() => handleDelete(audioReel.id, audioReel.soundTrack)} disabled={loading}>
						{loading ? <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
					</Button>
				)}
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-center">Upload your Soundtracks</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<AudioReelForm formHook={formHook} onSubmit={onSubmit} className="w-full">
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
					</AudioReelForm>
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={openDialog} onOpenChange={setOpenDialog}>
			<DrawerTrigger asChild>
				{audioReel ? (
					<Button variant="outline" size="icon">
						<Edit2 className="h-4 w-4" />
					</Button>
				) : (
					<Button variant="outline" size="icon">
						<PlusCircleIcon className="h-4 w-4" />
					</Button>
				)}
			</DrawerTrigger>
			{audioReel && (
				<Button variant="outline" size="icon" onClick={() => handleDelete(audioReel.id, audioReel.soundTrack)} disabled={loading}>
					{loading ? <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
				</Button>
			)}
			<DrawerContent className="w-full p-5">
				<DrawerHeader>
					<DrawerTitle>Upload your Soundtracks</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<AudioReelForm formHook={formHook} onSubmit={onSubmit} className="w-full py-5">
					<DialogFooter className="gap-2">
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
				</AudioReelForm>
			</DrawerContent>
		</Drawer>
	);
}
