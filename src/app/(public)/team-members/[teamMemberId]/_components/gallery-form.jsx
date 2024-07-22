"use client";
import { deleteGalleryImage } from "@/app/actions/gallery-images";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import GalleryEditorDialog from "./gallery-editor-dialog";
import Cropper from "react-easy-crop";

export default function GalleryForm({ teamMemberId, formHook, onSubmit, galleryImages, children }) {
	const [loading, setLoading] = useState(false);
	const { handleSubmit, control } = formHook;
	const [images, setImages] = useState(galleryImages);
	const [openGalleryDialog, setGalleryDialog] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });

	const handleImageChange = (event, onChange) => {
		const files = Array.from(event.target.files);
		if (files.length) {
			const newImages = files.map((file) => {
				const reader = new FileReader();
				return new Promise((resolve) => {
					reader.onload = () => resolve({ file, url: reader.result, local: true });
					reader.readAsDataURL(file);
				});
			});

			Promise.all(newImages).then((newImagesData) => {
				const newImageUrls = newImagesData.map((img) => ({
					id: "",
					imageUrl: img.url,
					local: img.local,
				}));
				onChange(files);
				setImages((previousGalleryImages) => [...previousGalleryImages, ...newImageUrls]);
			});
		}
	};

	async function handleEdit(e, image) {
		e.preventDefault();
		setSelectedImage(image);
		setGalleryDialog(true);
	}

	async function handleDelete(e, image) {
		e.preventDefault();
		setLoading(true);
		try {
			if (image.local) {
				setImages((previousImages) => previousImages.filter((img) => img !== image));
			} else {
				const response = await deleteGalleryImage(teamMemberId, image.id);
				if (response.success) {
					setImages((previousImages) => previousImages.filter((img) => img.id !== image.id));
					toast.success(response.message);
				} else {
					console.log(response.message);
					toast.error("Something went wrong");
				}
			}
		} catch (error) {
			console.log(error.message);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
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
							<FormItem className="relative box-border">
								<FormLabel className="flex justify-center items-center border-2 border-dashed rounded-md min-h-[4.75em] opacity-[1] p-[1em]">
									Drag & Drop your files or <span className="underline cursor-pointer ml-1"> Browse</span>
								</FormLabel>
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
								<FormDescription>You can upload images up to 20</FormDescription>
								<ScrollArea className="h-auto">
									<div className="grid grid-cols-4 gap-2 my-2">
										{images &&
											images.length > 0 &&
											images.map((image, index) => (
												<div key={index} className="relative">
													<Image
														src={image.imageUrl}
														width={`28`}
														height={`28`}
														alt={`Gallery Image ${index}`}
														className="h-28 w-28 object-cover rounded-sm"
													/>
													<div className="absolute z-99 top-0 left-0 w-full">
														<div className="flex justify-between p-2">
															{/* <Button variant="outline" size="icon" className="rounded-full" onClick={(e) => handleEdit(e, image)}>
																<Edit2 className="h-4 w-4" />
															</Button> */}
															<Button variant="outline" size="icon" className="rounded-full" onClick={(e) => handleDelete(e, image)}>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</div>
												</div>
											))}
									</div>
								</ScrollArea>
								{/* <GalleryEditorDialog openDialog={openGalleryDialog}>
									{selectedImage && <Cropper image={selectedImage.imageUrl} crop={crop} onCropChange={setCrop} />}
								</GalleryEditorDialog> */}
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
