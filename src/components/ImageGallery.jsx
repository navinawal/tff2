"use client";
import { useCallback, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { deleteGalleryImage } from "@/app/actions/gallery-images";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";

export default function ImageGallery({ galleryImages, teamMemberId }) {
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(-1);

	const handleOpenGallery = useCallback((index) => {
		setIndex(index);
	}, []);

	async function handleDeleteImage(imageId) {
		setLoading(true);
		try {
			const response = await deleteGalleryImage(teamMemberId, imageId);
			if (response.success) {
				toast.success(response.message);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error.message);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return galleryImages.length > 0 ? (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{galleryImages.map((image, idx) => (
				<div key={image.id} className="" onClick={() => handleOpenGallery(idx)}>
					<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
				</div>
			))}
			{index >= 0 && (
				<Lightbox
					index={index}
					slides={galleryImages.map((image) => ({
						src: image.imageUrl,
						thumb: image.imageUrl,
					}))}
					open={index >= 0}
					close={() => setIndex(-1)}
					toolbar={{
						buttons: [
							<div className="flex gap-2 p-5" key="delete-button">
								<Button
									variant="outline"
									size="icon"
									className="rounded-full bg-red-900 hover:bg-white hover:text-red-800"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteImage(galleryImages[index].id);
									}}
								>
									{loading ? <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="h-4 w-4" />}
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="rounded-full bg-red-900 hover:bg-white hover:text-red-800"
									onClick={() => setIndex(-1)}
								>
									<IoClose className="h-4 w-4" />
								</Button>
							</div>,
						],
					}}
				/>
			)}
		</div>
	) : (
		<div className="flex justify-center items-center h-[400px] border w-full border-dashed rounded-md text-4xl">No data</div>
	);
}
