// src/components/AudioReels.js
"use client";

import { getAllAudioReels } from "@/app/actions/teamMemberAudioReels";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export function AudioReels({ teamMemberId }) {
	const [audioReels, setAudioReels] = useState([]);

	useEffect(() => {
		async function getAudioReels() {
			const audioReels = await getAllAudioReels(teamMemberId);
			if (!getAllAudioReels.error) {
				setAudioReels(audioReels);
			}
		}
		getAudioReels();
	}, []);

	return (
		<Carousel
			className="w-full"
			opts={{
				align: "center",
			}}
		>
			<CarouselContent>
				{audioReels?.map(({ id, soundTrack, soundTrackTitle, description }) => (
					<CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
						<Card className="shadow-lg">
							<CardContent className="flex flex-col aspect-square justify-between p-6">
								<div className="flex flex-col">
									<div className="text-2xl">{soundTrackTitle}</div>
									<div className="text-xs">{description}</div>
								</div>
								<AudioPlayer src={soundTrack} className="!bg-transparent" />
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
