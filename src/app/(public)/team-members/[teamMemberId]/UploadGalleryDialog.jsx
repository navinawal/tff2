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
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { bulkUploadImagesToGallery } from "@/app/actions/gallery-images";
import { FiLoader } from "react-icons/fi";
import GalleryForm from "./_components/gallery-form";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UploadGalleryDialog({ teamMemberId, galleryImages }) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [openDialog, setOpenDialog] = useState(false);

	const formHook = useForm({
		// resolver: zodResolver(z.any().refine((files) => files?.length == 1, "Image is required.")),
		defaultValues: {
			galleryImages: [],
		},
	});

	if (!teamMemberId) return;

	const {
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		try {
			if (!formData || !formData.galleryImages || !formData.galleryImages.length > 0) {
				toast.error("at least one image is required");
				return;
			}

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

	if (isDesktop)
		return (
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<PlusCircleIcon className="h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload Gallery Images</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<GalleryForm teamMemberId={teamMemberId} formHook={formHook} onSubmit={onSubmit} galleryImages={galleryImages} className="w-full">
						<DialogFooter className="gap-2">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={isSubmitting}>
								{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
								{isSubmitting ? "Uploading Images ..." : "Upload"}
							</Button>
						</DialogFooter>
					</GalleryForm>
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={openDialog} onOpenChange={setOpenDialog}>
			<DrawerTrigger asChild>
				<Button variant="outline" size="icon">
					<PlusCircleIcon className="h-4 w-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className={`p-5`}>
				<DrawerHeader>
					<DrawerTitle>Upload Gallery Images</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<GalleryForm formHook={formHook} onSubmit={onSubmit} galleryImages={galleryImages} className="w-full">
					<DrawerFooter className={`p-0 m-0`}>
						<Button disabled={isSubmitting}>
							{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
							{isSubmitting ? "Uploading data ..." : "Upload"}
						</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</GalleryForm>
			</DrawerContent>
		</Drawer>
	);
}
