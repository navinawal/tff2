"use client";
import ReactPlayer from "react-player/lazy";

export default function VideoPlayer({ video }) {
	<ReactPlayer url={video} controls width="100%" className="aspect-video" />;
}
