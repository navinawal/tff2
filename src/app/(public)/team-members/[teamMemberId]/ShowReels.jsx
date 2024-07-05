"use client";

import { getAllShowReels } from "@/app/actions/teamMemberShowReels";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

export function ShowReels({ teamMemberId }) {
	const [showReels, setShowReels] = useState([]);

	useEffect(() => {
		async function getShowReels() {
			const showReels = await getAllShowReels(teamMemberId);
			if (!showReels.error) {
				setShowReels(showReels);
			}
		}
		getShowReels();
	}, []);
	return (
		<Carousel className="w-full">
			<CarouselContent>
				{showReels?.map(({ id, projectLink, projectTitle, projectDescription }) => (
					<CarouselItem key={id} className="md:basis-1/1 lg:basis-1/1">
						<div className="flex flex-col border rounded-md">
							<ReactPlayer url={projectLink} controls width="100%" className="aspect-video" />
							<div className="flex flex-col gap-2 px-5 py-8">
								<div className="text-2xl">{projectTitle}</div>
								<div className="text-xs">{projectDescription}</div>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
