"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import AudioReelsDialog from "./AudioReelsDialog";

export default function AudioReels({ uid, teamMemberId, audioReels }) {
	return (
		<Carousel
			className="w-full"
			opts={{
				align: "center",
			}}
		>
			<CarouselContent>
				{audioReels?.map((audioReel) => {
					const { id, soundTrack, soundTrackTitle, description } = audioReel;
					return (
						<CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
							<Card className="shadow-lg">
								<CardContent className="flex flex-col aspect-square justify-between p-6">
									<div className="flex flex-col">
										<div className="text-2xl">{soundTrackTitle}</div>
										<div className="text-xs">{description}</div>
									</div>
									<div className="flex justify-center items-center gap-2">
										{uid && uid === teamMemberId ? <AudioReelsDialog teamMemberId={teamMemberId} audioReel={audioReel} /> : null}
									</div>
									<AudioPlayer src={soundTrack} className="!bg-transparent" />
								</CardContent>
							</Card>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
