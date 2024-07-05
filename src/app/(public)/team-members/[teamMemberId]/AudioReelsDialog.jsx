"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Dropzone, { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { addAudioReel } from "@/app/actions/teamMemberAudioReels";
import { audioReelsFormSchema } from "@/schemas/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export function AudioReelsDialog({ teamMemberId }) {
	const [openDialog, setOpenDialog] = useState(false);

	const formHook = useForm({
		resolver: zodResolver(audioReelsFormSchema),
		defaultValues: {
			soundTrackTitle: "",
			soundTrack: "",
			description: "",
		},
	});

	if (!teamMemberId) return;

	const {
		handleSubmit,
		control,
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

			const response = await addAudioReel(teamMemberId, {
				...formData,
				soundTrack: soundTrackUrl,
			});

			if (response.success) {
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

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<PlusCircleIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[800px]">
				<DialogHeader>
					<DialogTitle className="text-center">Upload your Soundtracks</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...formHook}>
					<div className="flex gap-5">
						<div className="flex flex-col mt-4 px-4 h-[400px] max-h-[400px] overflow-y-auto scrollbar"></div>
						<div className="flex flex-1">
							<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
								<FormField
									control={control}
									name="soundTrackTitle"
									render={({ field }) => (
										<>
											<FormItem>
												<FormLabel>Soundtrack Title</FormLabel>
												<FormControl>
													<Input type="text" {...field} placeholder="Soundtrack Title"></Input>
												</FormControl>
												<FormDescription>Upload Your Soundtrack Here.</FormDescription>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<FormField
									control={control}
									name="soundTrack"
									render={({ field: { onChange, value, ...rest } }) => (
										<>
											<FormItem>
												<FormLabel></FormLabel>
												<FormControl>
													<Input
														type="file"
														{...rest}
														onChange={(event) => handleSoundTrackChange(event, onChange)}
														className="min-h-[100px] w-full"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<FormField
									control={control}
									name="description"
									render={({ field }) => (
										<>
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Input type="text" {...field} placeholder="Description"></Input>
												</FormControl>
												<FormDescription>Describe Something about Soundtract.</FormDescription>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<Button className="w-full" type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Submitting data ..." : "Submit"}
								</Button>
							</form>
						</div>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
