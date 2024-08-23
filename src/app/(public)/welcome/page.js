"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from "next/image";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import YouTube from 'react-youtube';

const getYouTubeID = (url) => {
    if (url.includes('youtube.com/shorts/')) {
        const shortsID = url.split('youtube.com/shorts/')[1].split('?')[0];
        return shortsID;
    } else {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
};

export default function Home() {
    const [isVertical, setIsVertical] = useState(false);
    const playerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const videos = {
        horizontal: {
            url: "https://www.youtube.com/watch?v=bj_doe4CbTs",
            startTime: 0,
            endTime: 12
        },
        vertical: {
            url: "https://youtube.com/shorts/2VFfvPeMLG8?si=O44Bbu7ShmMjyqJW",
            startTime: 0,
            endTime: 5
        }
    };

    const currentVideo = isVertical ? videos.vertical : videos.horizontal;
    const videoId = getYouTubeID(currentVideo.url);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            mute: 1,
            modestbranding: 1,
            iv_load_policy: 3,
            playsinline: 1,
            start: currentVideo.startTime,
            end: currentVideo.endTime,
            vq: 'hd1080'
        },
    };

    const onReady = useCallback((event) => {
        playerRef.current = event.target;
        playerRef.current.mute();
        setIsReady(true);
    }, []);

    const setQuality = useCallback(() => {
        if (playerRef.current) {
            const qualities = ['hd1080', 'hd720', 'large', 'medium', 'small'];
            const availableQualities = playerRef.current.getAvailableQualityLevels();
            for (let quality of qualities) {
                if (availableQualities.includes(quality)) {
                    playerRef.current.setPlaybackQuality(quality);
                    break;
                }
            }
        }
    }, []);

    const loopVideo = useCallback(() => {
        if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            if (currentTime < currentVideo.startTime) {
                playerRef.current.seekTo(currentVideo.startTime);
            } else if (currentTime >= currentVideo.endTime) {
                playerRef.current.seekTo(currentVideo.startTime);
            }
        }
    }, [currentVideo]);

    useEffect(() => {
        const handleResize = () => {
            setIsVertical(window.innerHeight > window.innerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isReady) {
            const qualityTimer = setTimeout(setQuality, 1000);
            const loopInterval = setInterval(loopVideo, 1000);

            return () => {
                clearTimeout(qualityTimer);
                clearInterval(loopInterval);
            };
        }
    }, [isReady, setQuality, loopVideo]);

    return (
        <div className="relative min-h-screen overflow-hidden">
            <style jsx global>{`
                body, html {
                    font-family: 'Arial Narrow', 'Helvetica Neue', 'Franklin Gothic Medium', Arial, sans-serif;
                }
                .video-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: -1;
                }
                .video-blur {
                    filter: blur(5px);
                }
            `}</style>
            <div className="fixed inset-0 w-full h-full z-0">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={onReady}
                    className="video-background video-blur"
                    containerClassName="w-full h-full"
                />
            </div>
            <div className="relative z-10 bg-black bg-opacity-50 min-h-screen text-white">
                <AppMaxWidthContainer>
                    <Hero />
                    <Objective />
                    <Features />
                    <AdditionalFeatures />
                </AppMaxWidthContainer>
            </div>
        </div>
    );
}

// ... Rest of your component definitions (Hero, Objective, Features, AdditionalFeatures) remain unchanged

function Hero() {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 py-10 lg:py-20 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 space-y-4">
                <h2 className="text-lg lg:text-xl font-bold text-purple-500">Welcome to</h2>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-600 animate-pulse">
                    TEAMFORFILM.COM
                </h1>
                <h2 className="text-2xl lg:text-3xl font-bold text-yellow-300">
                    Connect • Showcase • Collaborate
                </h2>
                <p className="text-lg lg:text-xl leading-relaxed text-purple-100">
                    TeamForFilm aspires to become a common home for Nepali film
                    professionals and serve as a comprehensive database for the film
                    industry. We've developed a platform to address the challenges in
                    locating suitable team members and provide a stage for emerging
                    talents.
                </p>
            </div>
            <div className="w-full lg:w-1/2">
                <Image
                    src="/images/resource/search-popup-from-laptop.png"
                    alt="TeamForFilm platform preview"
                    width={700}
                    height={400}
                    className="w-full h-auto"
                />
            </div>
        </section>
    );
}

function Objective() {
    return (
        <section className="py-10 lg:py-20 text-center px-4 lg:px-0">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                Our Objective
            </h2>
            <p className="text-lg lg:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
                Our goal is to create a platform where aspiring individuals can be
                easily discovered by filmmakers seeking talent, making the process of
                talent discovery effortless and efficient. We facilitate the easy
                formation of film production teams, ensuring filmmakers can quickly
                assemble the right talent for their projects with our advanced features
                as described below.
            </p>
        </section>
    );
}

function Features() {
    const features = [
        {
            title: "Swift assessment with Comprehensive Profiles",
            description:
                "Each candidate maintains a comprehensive profile that encapsulates their skills, experience, and work samples, enabling efficient evaluation.",
            image: "/images/resource/COMPREHENSIVE-PROFILE-2.png",
        },
        {
            title: 'Easy navigation through "ShowReels with Timestamps"',
            description:
                "Candidates can post video reels with timestamps, allowing filmmakers to swiftly navigate to relevant scenes, saving time in the review process.",
            image: "/images/resource/timestamps-opt-2.png",
        },
        {
            title: 'Quick analysis through "Career Summary Metrics"',
            description:
                "This feature assists filmmakers in assessing a candidate's experience and expertise, while providing candidates a platform to showcase their career trajectory.",
            image: "/images/resource/CHARTS-2.png",
        },
    ];

    return (
        <section className="py-10 lg:py-20 space-y-20 px-4 lg:px-0">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        } items-center gap-10`}
                >
                    <div className="w-full lg:w-1/2">
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            width={700}
                            height={index === 2 ? 300 : 400}
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                        <h3 className="text-3xl lg:text-4xl font-bold text-blue-300">
                            {feature.title}
                        </h3>
                        <p className="text-lg lg:text-xl text-purple-100">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}

function AdditionalFeatures() {
    const features = [
        {
            title: "Online Audition Applications",
            description:
                "Submit audition tapes and materials online, streamlining the application process for roles.",
            icon: "🎭",
        },
        {
            title: "Post Online Call for Auditions",
            description:
                "Advertise casting calls and invite talents to submit digital auditions efficiently.",
            icon: "📢",
        },
        {
            title: "Save Your Favorite Members",
            description:
                "Build connections by saving profiles of admired collaborators for easy access.",
            icon: "⭐",
        },
        {
            title: "Post About Required Team Members",
            description:
                "Broadcast project requirements and invite interested individuals to join your creative endeavors.",
            icon: "🤝",
        },
        {
            title: "User-Generated Reels Showcase",
            description:
                "Share self-made reels to display creativity and gain recognition within the filmmaking community.",
            icon: "🎬",
        },
    ];

    return (
        <section className="py-10 lg:py-20 px-4 lg:px-0">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-blue-300">
                Other Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-purple-300">
                            {feature.title}
                        </h3>
                        <p className="text-lg text-purple-100">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            <p className="mt-10 text-lg italic text-center text-purple-200">
                While many features are fully functional, some are still in development.
                We're continuously working to enhance your experience and welcome your
                valuable feedback.
            </p>
        </section>
    );
}