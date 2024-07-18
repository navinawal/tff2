"use client";
import { useCallback, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export default function ImageGallery({ galleryImages }) {
	const [index, setIndex] = useState(-1);

	const handleOpenGallery = useCallback((index) => {
		setIndex(index);
	}, []);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div className="grid gap-4 place-content-start">
				{galleryImages.slice(0, 4).map((image, idx) => (
					<div key={image.id} className="" onClick={() => handleOpenGallery(idx)}>
						<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
					</div>
				))}
			</div>
			<div className="grid gap-4 place-content-start">
				{galleryImages.slice(4, 8).map((image, idx) => (
					<div key={image.id} className="" onClick={() => handleOpenGallery(idx + 3)}>
						<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
					</div>
				))}
			</div>
			<div className="grid gap-4 place-content-start">
				{galleryImages.slice(9, 12).map((image, idx) => (
					<div key={image.id} className="" onClick={() => handleOpenGallery(idx + 6)}>
						<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
					</div>
				))}
			</div>
			<div className="grid gap-4 place-content-start">
				{galleryImages.slice(12, 16).map((image, idx) => (
					<div key={image.id} className="" onClick={() => handleOpenGallery(idx + 9)}>
						<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
					</div>
				))}
			</div>
			<div className="grid gap-4 place-content-start">
				{galleryImages.slice(16, 20).map((image, idx) => (
					<div key={image.id} className="" onClick={() => handleOpenGallery(idx + 12)}>
						<Image src={image.imageUrl} alt="" className="h-auto max-w-full w-full rounded-lg" width={300} height={400} />
					</div>
				))}
			</div>
			<Lightbox
				index={index}
				slides={galleryImages.map((image) => ({
					src: image.imageUrl,
					thumb: image.imageUrl,
					subHtml: `<div class="lightbox-caption">${image.caption}</div>`,
				}))}
				open={index >= 0}
				close={() => setIndex(-1)}
			/>
		</div>
	);
}
