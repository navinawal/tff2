"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FilmIcon, UserGroupIcon, ChartBarIcon, PhotoIcon, MicrophoneIcon, StarIcon } from '@heroicons/react/24/outline';
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import styles from './Welcome.module.css';
import FeaturedShowReel from './components/FeaturedShowReel';

const features = [
    { name: "Comprehensive Profiles", icon: UserGroupIcon },
    { name: "ShowReels with Timestamps", icon: FilmIcon },
    { name: "Career Summary Metrics", icon: ChartBarIcon },
    { name: "Gallery", icon: PhotoIcon },
    { name: "Audio Reels", icon: MicrophoneIcon },
    { name: "Reviews", icon: StarIcon }
];

function Hero() {
    return (
        <section className="relative py-20 lg:py-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src="/images/logo_white.png"
                    alt="TeamForFilm Logo"
                    width={300}
                    height={100}
                    className="mx-auto mb-8"
                />
                <h1 className={`text-5xl lg:text-7xl font-extrabold ${styles.textHGradient} mb-6`}>
                    TEAMFORFILM.COM
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-400 mb-8">
                    Connect • Showcase • Collaborate
                </h2>
                <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-gray-300 mb-12">
                    Your gateway to the Nepali film industry. Discover talent, showcase your skills, and build your dream team.
                </p>
                <Link href="/signup" className={`font-bold py-3 px-8 rounded-full text-xl ${styles.ctaButton}`}>
                    Join the Community
                </Link>
            </motion.div>
        </section>
    );
}

function About() {
    return (
        <section className="py-20 lg:py-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 className="text-3xl lg:text-4xl font-bold text-purple-400 mb-8">About TEAMFORFILM.COM</h2>
                <p className="text-xl max-w-4xl mx-auto text-gray-300 mb-12">
                    TeamForFilm aspires to become a common home for Nepali film professionals and serve as a comprehensive database for the film industry. Recognizing the inherent challenges in locating suitable team members for film projects and the lack of platforms for emerging talents to exhibit their abilities, we have attempted to develop a platform to address these issues.
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-6">OUR OBJECTIVE</h3>
                <p className="text-xl max-w-4xl mx-auto text-gray-300">
                    Our goal is to create a platform where aspiring individuals can be easily discovered by filmmakers seeking talent, making the process of talent discovery effortless and efficient. Additionally, we facilitate the easy formation of film production teams, ensuring that filmmakers can quickly assemble the right talent for our advanced features.
                </p>
            </motion.div>
        </section>
    );
}

function Features() {
    return (
        <section className="py-16 lg:py-24">
            <h2 className={`text-4xl lg:text-5xl font-extrabold text-center ${styles.textHGradient} mb-16`}>Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                ))}
            </div>
        </section>
    );
}

function FeatureCard({ feature, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-lg p-8 shadow-lg ${styles.featureCard}`}
        >
            <feature.icon className={`h-16 w-16 mb-6 ${styles.featureIcon}`} />
            <h3 className={`text-2xl font-bold mb-4 ${styles.textHGradient}`}>{feature.name}</h3>
            <p className="text-gray-300 mb-6 text-lg">
                {getFeatureDescription(feature.name)}
            </p>
            <Link href={`#${feature.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300">
                Learn More →
            </Link>
        </motion.div>
    );
}

function getFeatureDescription(feature) {
    const descriptions = {
        "Comprehensive Profiles": "Showcase your skills, experience, and work samples in one place.",
        "ShowReels with Timestamps": "Navigate through video reels efficiently with our timestamp feature.",
        "Career Summary Metrics": "Visualize your career trajectory and stand out to potential collaborators.",
        "Gallery": "Display your best work in a visually appealing gallery.",
        "Audio Reels": "Showcase your vocal talents and music compositions.",
        "Reviews": "Build credibility with reviews from industry professionals.",
    };
    return descriptions[feature] || "";
}

export default function Home() {
    return (
        <div className={`text-foreground font-sans min-h-screen ${styles.heroBackground} relative overflow-hidden`}>
            <AppMaxWidthContainer>
                <Hero />
                <FeaturedShowReel />
                <About />
                <Features />
            </AppMaxWidthContainer>
        </div>
    );
}