"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ShowReelsDialog from "./ShowReelsDialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function ShowReels({ uid, teamMemberId, showReels }) {
	const playerRefs = useRef([]);
	const [hasWindow, setHasWindow] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);

	const handleTimestampClick = (index, time) => {
		const timeInSeconds = parseFloat(time);
		if (playerRefs.current[index]) {
			playerRefs.current[index].seekTo(timeInSeconds, "seconds", true);
		}
	};

	return showReels.length > 0 ? (
		<div className="relative w-full">
			<Carousel className="w-full">
				<CarouselContent>
					{showReels.map((showReel, index) => {
						const { id, projectLink, projectTitle, projectDescription, showReelTimeStamps } = showReel;
						return (
							<CarouselItem key={id} className="md:basis-1/1 lg:basis-1/1">
								<div className="flex flex-col border rounded-md">
									{hasWindow && (
										<ReactPlayer
											ref={(ref) => {
												playerRefs.current[index] = ref;
											}}
											url={projectLink}
											playing={false}
											onReady={() => console.log("Player is ready")}
											controls
											width="100%"
											className="aspect-video"
										/>
									)}
									<div className="flex flex-col gap-2 px-5 py-8">
										<div className="flex">
											<div className="flex-1">
												<div className="text-2xl">{projectTitle}</div>
												<div className="text-xs">{projectDescription}</div>
											</div>
											<div className="flex justify-center items-center gap-2">
												{uid && uid === teamMemberId && (
													<ShowReelsDialog teamMemberId={teamMemberId} showReel={showReel} />
												)}
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
				{/* Navigation buttons controlled by Carousel */}
				<div className="absolute inset-x-0 bottom-0 flex justify-between px-4">
					<CarouselPrevious className="bg-gray-800 text-white" />
					<CarouselNext className="bg-gray-800 text-white" />
				</div>
			</Carousel>
		</div>
	) : (
		<div className="flex justify-center items-center h-[400px] border w-full border-dashed rounded-md text-4xl">No data</div>
	);
}