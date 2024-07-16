"use client";

import dynamic from "next/dynamic";

import ReactPlayer from "react-player/youtube";

// const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

export default function YoutubeVideoPlayer({ ref, url, playing, onReady, controls, width, className }) {
	return <ReactPlayer ref={ref} url={url} playing={playing} onReady={onReady} controls={controls} width={width} className={className} />;
}
