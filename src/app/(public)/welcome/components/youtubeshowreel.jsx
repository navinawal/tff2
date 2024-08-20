import React, { useEffect, useRef, useState } from 'react';

const YouTubeShowReel = ({ videoId, timestamps }) => {
    const playerRef = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);

    useEffect(() => {
        // Load the YouTube API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize the player when the API is ready
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '360',
                width: '640',
                videoId: videoId,
                events: {
                    onReady: () => setPlayerReady(true),
                },
            });
        };

        // Cleanup
        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, [videoId]);

    const handleTimestampClick = (time) => {
        if (playerReady && playerRef.current) {
            playerRef.current.seekTo(time);
        }
    };

    return (
        <div className="w-full">
            <div className="aspect-w-16 aspect-h-9">
                <div id="youtube-player"></div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
                {timestamps.map((stamp, index) => (
                    <button
                        key={index}
                        onClick={() => handleTimestampClick(stamp.time)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                        {stamp.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default YouTubeShowReel;