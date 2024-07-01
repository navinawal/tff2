"use client";
import LightGallery from "lightgallery/react";

import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function App() {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);

	const fetchImages = async () => {
		try {
			const response = await fetch(`https://picsum.photos/v2/list?limit=10&page=${page}`);
			const data = await response.json();
			console.log(data);
			setImages((prevImages) => [...prevImages, ...data]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
			<InfiniteScroll dataLength={images.length} next={fetchImages} hasMore={true} loader={<h4>Loading...</h4>}>
				<ResponsiveMasonry columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}>
					<Masonry gutter="10px">
						{images.map((image) => {
							return (
								<a
									key={image.id}
									data-lg-size="1600-1067"
									data-src={image.download_url}
									data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@tobbes_rd' >Tobias Rademacher </a></h4><p> Location - <a href='https://unsplash.com/s/photos/puezgruppe%2C-wolkenstein-in-gr%C3%B6den%2C-s%C3%BCdtirol%2C-italien'>Puezgruppe, Wolkenstein in Gröden, Südtirol, Italien</a>layers of blue.</p>"
								>
									<img alt="layers of blue." className="img-responsive" src={image.download_url} />
								</a>
							);
						})}
					</Masonry>
				</ResponsiveMasonry>
			</InfiniteScroll>
		</LightGallery>
	);
}
