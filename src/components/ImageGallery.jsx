"use client";
import { useCallback, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Masonry from "react-masonry-css";

export default function ImageGallery({ images }) {
	const lightGalleryRef = useRef(null);

	const dynamicEl = images.map((image) => ({
		src: image.imageUrl,
		thumb: image.imageUrl,
		subHtml: "",
	}));

	const handleOpenGallery = useCallback((index) => {
		if (lightGalleryRef.current) {
			lightGalleryRef.current.openGallery(index);
		}
	}, []);

	return (
		<div>
			<Masonry breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }} className="masonry-grid" columnClassName="masonry-column">
				{images.map(({ id, imageUrl }, index) => (
					<div key={id} className="masonry-item" onClick={() => handleOpenGallery(index)} style={{ cursor: "pointer" }}>
						<img alt="layers of blue." className="img-responsive" src={imageUrl} />
					</div>
				))}
			</Masonry>
			<LightGallery onInit={(ref) => (lightGalleryRef.current = ref.instance)} dynamic dynamicEl={dynamicEl} plugins={[lgZoom, lgThumbnail]} />
			<style jsx global>
				{`
					.masonry-grid {
						display: flex;
						margin-left: -10px;
						width: auto;
					}

					.masonry-column {
						padding-left: 10px;
						background-clip: padding-box;
					}

					.masonry-item {
						margin-bottom: 10px;
					}
				`}
			</style>
		</div>
	);
}
