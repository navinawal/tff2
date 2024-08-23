"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const YouTube = dynamic(() => import('react-youtube'), { ssr: false });

// Function to extract YouTube ID from URL
const getYouTubeID = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const VideoBackgroundLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const videoURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your actual YouTube video URL
    const videoId = getYouTubeID(videoURL);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // YouTube Player Options
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId,
            mute: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            rel: 0,
        },
    };

    return (
        <div className="video-background-container">
            {!isMobile && videoId && (
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    className="video-background"
                    containerClassName="w-full h-full"
                />
            )}
            {isMobile && (
                <div className="mobile-video-placeholder">Video Not Available</div>
            )}
            <div className="content-container">{children}</div>
            <style jsx>{`
                .video-background-container {
                    position: relative;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                }
                .video-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    object-fit: cover;
                    z-index: -1;
                }
                .content-container {
                    position: relative;
                    z-index: 1;
                }
                .mobile-video-placeholder {
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: black;
                }
            `}</style>
        </div>
    );
};

export default VideoBackgroundLayout;