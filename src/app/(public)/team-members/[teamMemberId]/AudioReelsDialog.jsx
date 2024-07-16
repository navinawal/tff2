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

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Edit2, PlusCircleIcon, Trash2 } from "lucide-react";
import { useState } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { audioReelsFormSchema } from "@/schemas/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAudioReel, deleteAudioReel, updateAudioReel } from "@/app/actions/audio-reels";
import { FiLoader } from "react-icons/fi";
import AudioReelForm from "./_components/audio-reel-form";

export default function AudioReelsDialog({ teamMemberId, audioReel }) {
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

	const handleSoundTrackChange = (event, onChange) => {
		const file = event.target.files[0];
		if (file) {
			// const reader = new FileReader();
			// reader.onloadend = () => {
			// 	setPreview(reader.result);
			// };
			// reader.readAsDataURL(file);
			onChange(file);
		}
	};

	async function handleDelete(audioReelId) {
		setLoading(true);
		try {
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
				<Button variant="outline" size="icon" onClick={() => handleDelete(audioReel.id)} disabled={loading}>
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
}
