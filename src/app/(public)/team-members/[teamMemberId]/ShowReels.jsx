"use client";

import { getAllShowReels } from "@/app/actions/teamMemberShowReels";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
// import ReactPlayer from "react-player/youtube";
import ShowReelsDialog from "./ShowReelsDialog";
import YoutubeVideoPlayer from "./_components/youtube-video-player";
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

export default function ShowReels({ uid, teamMemberId, showReels }) {
	const playerRefs = useRef([]);

	const handleTimestampClick = (index, time) => {
		console.log(index, time, playerRefs.current, playerRefs.current[index]);
		const timeInSeconds = parseFloat(time);
		if (playerRefs.current[index]) {
			playerRefs.current[index].seekTo(timeInSeconds, "seconds", true);
			setCurrentTime(timeInSeconds);
		}
	};

	return showReels.length > 0 ? (
		<Carousel className="w-full">
			<CarouselContent>
				{showReels?.map((showReel, index) => {
					const { id, projectLink, projectTitle, projectDescription, showReelTimeStamps } = showReel;
					return (
						<CarouselItem key={id} className="md:basis-1/1 lg:basis-1/1">
							<div className="flex flex-col border rounded-md">
								<ReactPlayer
									ref={(ref) => (playerRefs.current[index] = ref)}
									url={projectLink}
									playing={false}
									onReady={() => console.log("Player is ready")}
									controls
									width="100%"
									className="aspect-video"
								/>
								<div className="flex flex-col gap-2 px-5 py-8">
									<div className="flex">
										<div className="flex-1">
											<div className="text-2xl">{projectTitle}</div>
											<div className="text-xs">{projectDescription}</div>
										</div>
										<div className="flex justify-center items-center gap-2">
											{uid && uid === teamMemberId ? <ShowReelsDialog teamMemberId={teamMemberId} showReel={showReel} /> : null}
										</div>
									</div>
									{showReelTimeStamps && (
										<ScrollArea className="w-full whitespace-nowrap py-5">
											<div className="flex gap-5">
												{showReelTimeStamps.map(({ title, timestamp }, timestampIndex) => (
													<Button
														variant="outline"
														className="cursor-pointer"
														key={timestampIndex}
														onClick={() => handleTimestampClick(index, timestamp)}
													>
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
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	) : (
		<div className="flex justify-center items-center h-[400px] border w-full border-dashed rounded-md text-4xl">No data</div>
	);
}
