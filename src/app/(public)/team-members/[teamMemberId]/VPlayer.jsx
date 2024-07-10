"use client";
import ReactPlayer from "react-player/youtube";

const VPlayer = ({ playerRef, url, playing, controls, width, className, onReady }) => {
	return <ReactPlayer ref={playerRef} url={url} playing={playing} controls={controls} width={width} className={className} onReady={onReady} />;
};

export default VPlayer;
