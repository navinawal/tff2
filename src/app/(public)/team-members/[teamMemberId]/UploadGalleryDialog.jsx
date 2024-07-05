"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Dropzone, { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { bulkUploadImagesToGallery } from "@/app/actions/teamMemberGalleryImages";
import { toast } from "sonner";

export function UploadGalleryDialog({ teamMemberId }) {
	const [openDialog, setOpenDialog] = useState(false);
	const [galleryImages, setGalleryImages] = useState([]);

	const formHook = useForm({
		defaultValues: {
			galleryImages: [],
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
			const storage = getStorage();

			const uploadPromises = formData?.galleryImages?.map((file) => {
				const storageRef = ref(storage, `/team_members/gallery_images/${teamMemberId}/${Date.now()}-${file.name}`);
				return uploadBytes(storageRef, file)
					.then((snapshot) => getDownloadURL(snapshot.ref))
					.then((downloadURL) => {
						return { imageUrl: downloadURL };
					});
			});

			const galleryImageUrls = await Promise.all(uploadPromises);
			const response = await bulkUploadImagesToGallery(teamMemberId, galleryImageUrls);

			if (response.success) {
				toast.success(response.message);
				setOpenDialog(false);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.error("Error uploading files:", error);
			toast.error("Something went wrong");
		}
	}

	const handleImageChange = (event, onChange) => {
		const files = Array.from(event.target.files);
		if (files.length) {
			const newImages = files.map((file) => {
				const reader = new FileReader();
				return new Promise((resolve) => {
					reader.onload = () => resolve({ file, url: reader.result });
					reader.readAsDataURL(file);
				});
			});

			Promise.all(newImages).then((newImagesData) => {
				const newImageUrls = newImagesData.map((img) => {
					return { id: "", url: img.url };
				});
				onChange(files);
				setGalleryImages((previousGalleryImages) => [...previousGalleryImages, ...newImageUrls]);
			});
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
					<DialogTitle>Upload Gallery Images</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...formHook}>
					<div className="flex gap-5">
						<div className="flex flex-col mt-4 px-4 h-[400px] max-h-[400px] overflow-y-auto scrollbar">
							{galleryImages?.length > 0 &&
								galleryImages.map((image, index) => <img key={index} src={image.url} alt={`Gallery Image ${index}`} className="mb-2 h-20 w-20" />)}
						</div>
						<div className="flex flex-1">
							<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
								<FormField
									control={control}
									name="galleryImages"
									render={({ field: { onChange, value, ...rest } }) => (
										<>
											<FormItem>
												<FormLabel></FormLabel>
												<FormControl>
													<Input
														type="file"
														{...rest}
														onChange={(event) => handleImageChange(event, onChange)}
														multiple
														className="min-h-[300px] w-full"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<Button className="w-full" type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Uploading ..." : "Upload"}
								</Button>
							</form>
						</div>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
