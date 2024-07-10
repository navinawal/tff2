"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer({ video }) {
	return <ReactPlayer url={video} controls width="100%" height="100%" />;
}
