"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

function FeaturedShowReel() {
    const [player, setPlayer] = useState(null);

    const showReel = {
        id: 1,
        title: "Featured ShowReel",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        timestamps: [
            { time: 0, label: "Intro" },
            { time: 30, label: "First Verse" },
            { time: 60, label: "Chorus" },
            { time: 90, label: "Second Verse" },
            { time: 120, label: "Bridge" },
            { time: 150, label: "Final Chorus" },
        ],
    };

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: extractVideoId(showReel.videoUrl),
                events: {
                    'onReady': onPlayerReady,
                }
            });
        };

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    const onPlayerReady = (event) => {
        setPlayer(event.target);
    };

    const handleTimestampClick = (time) => {
        if (player) {
            player.seekTo(time);
        }
    };

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <section className="py-20 relative">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl lg:text-5xl font-extrabold text-center mb-10"
            >
                Featured ShowReel
            </motion.h2>
            <div className="relative w-full h-[180px] md:h-[270px] lg:h-[360px] mb-6"> {/* Fixed height container */}
                <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {showReel.timestamps.map((timestamp, index) => (
                    <button
                        key={index}
                        onClick={() => handleTimestampClick(timestamp.time)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                        {timestamp.label}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default FeaturedShowReel;