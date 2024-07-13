"use client";

import { getAllShowReels } from "@/app/actions/teamMemberShowReels";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const VPlayer = dynamic(() => import("./VPlayer"), { ssr: false });

export function ShowReels({ teamMemberId }) {
	const [showReels, setShowReels] = useState([]);
	const [currentUrl, setCurrentUrl] = useState(null);
	const [currentTime, setCurrentTime] = useState(0);
	const playerRef = useRef(null);

	useEffect(() => {
		async function getShowReels() {
			const showReels = await getAllShowReels(teamMemberId);
			if (!showReels.error) {
				setShowReels(showReels);
				setCurrentUrl(showReels[0]?.projectLink);
			}
		}
		getShowReels();
	}, [teamMemberId]);

	const handleTimestampClick = (time) => {
		console.log("Timestamp Clicked:", time);
		console.log("PlayerRef:", playerRef.current.seekTo);
		if (playerRef.current) {
			console.log("PlayerRef is not null");
			const timeInSeconds = parseFloat(time);
			playerRef.current.seekTo(timeInSeconds, "seconds", true);
			setCurrentTime(timeInSeconds);
		} else {
			console.log("PlayerRef is null");
		}
	};

	return (
		<Carousel className="w-full">
			<CarouselContent>
				{showReels?.map(({ id, projectLink, projectTitle, projectDescription, showReelTimeStamps }) => (
					<CarouselItem key={id} className="md:basis-1/1 lg:basis-1/1">
						<div className="flex flex-col border rounded-md">
							<VPlayer
								playerRef={playerRef}
								url={projectLink}
								playing={false}
								onReady={() => console.log("Player is ready")}
								controls
								width="100%"
								className="aspect-video"
							/>
							<div className="flex flex-col gap-2 px-5 py-8">
								<div className="text-2xl">{projectTitle}</div>
								<div className="text-xs">{projectDescription}</div>
								{showReelTimeStamps && (
									<ScrollArea className="w-full whitespace-nowrap">
										<div className="flex gap-5">
											{showReelTimeStamps.map(({ title, timestamp }, index) => (
												<Button className="cursor-pointer" key={index} onClick={() => handleTimestampClick(timestamp)}>
													{title}
												</Button>
											))}
										</div>
										<ScrollBar orientation="horizontal" />
									</ScrollArea>
								)}
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
