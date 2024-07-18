"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function GalleryForm({ formHook, onSubmit, children }) {
	const { handleSubmit, control } = formHook;
	const [galleryImages, setGalleryImages] = useState([]);

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
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 p-4">
				<FormField
					control={control}
					name="galleryImages"
					render={({ field: { onChange, value, ...rest } }) => (
						<>
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<Input type="file" {...rest} onChange={(event) => handleImageChange(event, onChange)} multiple className="min-h-[300px] w-full" />
								</FormControl>
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
