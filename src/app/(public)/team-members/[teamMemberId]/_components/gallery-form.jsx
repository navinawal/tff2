"use client";
import { deleteGalleryImage } from "@/app/actions/gallery-images";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, PlusCircleIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import Cropper from "react-easy-crop";
export default function GalleryForm({ teamMemberId, formHook, onSubmit, galleryImages, children }) {
	const [loading, setLoading] = useState(false);
	const { handleSubmit, control } = formHook;
	const [images, setImages] = useState(galleryImages);
	const [crop, setCrop] = useState({ x: 0, y: 0 });

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
				const newImageUrls = newImagesData.map((img) => ({
					id: "",
					imageUrl: img.url,
				}));
				onChange(files);
				setImages((previousGalleryImages) => [...previousGalleryImages, ...newImageUrls]);
			});
		}
	};

	async function handleEdit(e) {
		e.preventDefault();
		console.log("ed");
	}

	async function handleDelete(e, galleryId) {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await deleteGalleryImage(teamMemberId, galleryId);
			if (response.success) {
				setImages((previousImages) => previousImages.filter((image) => image.id !== galleryId));
				toast.success(response.message);
			} else {
				console.log(response.message);
				toast.error("something went wrong");
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			toast.error("something went wrong");
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
				<FormField
					control={control}
					name="galleryImages"
					render={({ field: { onChange, value, ...rest } }) => (
						<>
							<FormItem className="relative box-border border border-dashed rounded-md">
								<FormLabel className="flex justify-center items-center min-h-[4.75em] opacity-[1] p-[1em]">Upload or Drag files here</FormLabel>
								<FormControl>
									<Input
										type="file"
										{...rest}
										onChange={(event) => handleImageChange(event, onChange)}
										multiple
										className="absolute m-0 p-0 opacity-0 z-[1] top-[1.75em]"
										max={20}
									/>
								</FormControl>

								<ScrollArea className="h-auto p-4">
									<div className="grid grid-cols-4 gap-2">
										{images &&
											images?.length > 0 &&
											images.map((image, index) => (
												<div key={index} className="relative">
													<Image src={image.imageUrl} width={`28`} height={`28`} alt={`Gallery Image ${index}`} className="h-28 w-28 object-cover" />
													<div className="absolute z-99 top-0 left-0 w-full">
														<div className="flex justify-between">
															<Button variant="outline" size="icon" className="rounded-full" onClick={(e) => handleDelete(e, image.id)}>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</div>
											))}
									</div>
								</ScrollArea>
							</FormItem>
						</>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
