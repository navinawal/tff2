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
import { bulkUploadImagesToGallery } from "@/app/actions/teamMemberGalleryImages";
import { FiLoader } from "react-icons/fi";
import GalleryForm from "./_components/gallery-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function UploadGalleryDialog({ teamMemberId, galleryImages }) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [openDialog, setOpenDialog] = useState(false);

	const formHook = useForm({
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
				<DialogContent className="max-w-[800px]">
					<DialogHeader>
						<DialogTitle>Upload Gallery Images</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<ScrollArea className="w-full whitespace-nowrap rounded-md border">
						<div className="flex gap-2">
							{galleryImages &&
								galleryImages?.length > 0 &&
								galleryImages.map((image, index) => (
									<Image key={index} src={image.imageUrl} width={`24`} height={`24`} alt={`Gallery Image ${index}`} className="mb-2 h-24 w-24" />
								))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
					<GalleryForm formHook={formHook} onSubmit={onSubmit} galleryImages={galleryImages} className="w-full">
						<DialogFooter className="gap-2">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={isSubmitting}>
								{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
								{isSubmitting ? "Uploading data ..." : "Upload"}
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
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Upload Gallery Images</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<GalleryForm formHook={formHook} onSubmit={onSubmit} galleryImages={galleryImages} className="w-full">
					<DrawerFooter className="gap-2 sm:space-x-0">
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
						<Button disabled={isSubmitting}>
							{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
							{isSubmitting ? "Uploading data ..." : "Upload"}
						</Button>
					</DrawerFooter>
				</GalleryForm>
			</DrawerContent>
		</Drawer>
	);
}
