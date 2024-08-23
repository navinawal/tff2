"use client";

import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import BokehBackground from "@/components/BokehBackground"; // Import the Bokeh background component

export default function Home() {
  return (
    <div className="text-white font-sans min-h-screen bg-gradient-radial from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <BokehBackground />
      <AppMaxWidthContainer>
        <Hero />
        <Objective />
        <Features />
        <AdditionalFeatures />
      </AppMaxWidthContainer>
    </div>
  );
}

function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 py-10 lg:py-20 px-4 lg:px-0">
      <motion.div
        className="w-full lg:w-1/2 space-y-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-purple-500">About</h2>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-600">
          TEAMFORFILM.COM
        </h1>
        <p className="text-lg lg:text-xl leading-relaxed text-purple-100">
          TeamForFilm aspires to become a common home for Nepali film
          professionals and serve as a comprehensive database for the film
          industry. We&apos;ve developed a platform to address the challenges in
          locating suitable team members and provide a stage for emerging
          talents.
        </p>
      </motion.div>
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/images/resource/search-popup-from-laptop.png"
          alt="TeamForFilm platform preview"
          width={700}
          height={400}
          className="rounded-lg shadow-2xl"
        />
      </motion.div>

      {/* Mobile-only text */}
      <div className="block lg:hidden w-full text-center mt-6 px-4">
        <h2 className="text-lg font-bold text-purple-500">About</h2>
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-600">
          TEAMFORFILM.COM
        </h1>
        <p className="text-base leading-relaxed text-purple-100">
          TeamForFilm aspires to become a common home for Nepali film
          professionals and serve as a comprehensive database for the film
          industry. We&apos;ve developed a platform to address the challenges in
          locating suitable team members and provide a stage for emerging
          talents.
        </p>
      </div>
    </section>
  );
}

function Objective() {
  return (
    <motion.section
      className="py-10 lg:py-20 text-center px-4 lg:px-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
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
    </motion.section>
  );
}

// (Rest of the code remains unchanged)


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
        <motion.div
          key={index}
          className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-10`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
        >
          <div className="w-full lg:w-1/2">
            <Image
              src={feature.image}
              alt={feature.title}
              width={700}
              height={index === 2 ? 300 : 400} // Adjust height for the third image
              className="rounded-lg shadow-2xl"
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
        </motion.div>
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
    <motion.section
      className="py-10 lg:py-20 px-4 lg:px-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center text-blue-300">
        Other Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-300">
              {feature.title}
            </h3>
            <p className="text-lg font-mono text-purple-100">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="mt-10 text-lg italic text-center text-purple-200">
        While many features are fully functional, some are still in development.
        We&apos;re continuously working to enhance your experience and welcome your
        valuable feedback.
      </p>
    </motion.section>
  );
}
