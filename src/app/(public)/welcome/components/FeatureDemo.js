import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import ImageGallery from "@/components/ImageGallery";
import ShowReels from "@/app/(public)/team-members/[teamMemberId]/ShowReels";
import AudioReels from "@/app/(public)/team-members/[teamMemberId]/AudioReels";
import Reviews from "@/app/(public)/team-members/[teamMemberId]/Reviews";
import styles from "@/app/(public)/team-members/[teamMemberId]/styles.module.css";

const FeatureDemo = ({ feature }) => {
    const sampleTeamMember = {
        shortFilms: 10,
        featureFilms: 5,
        webSeries: 3,
        documentaries: 7,
        musicVideos: 15,
        theatreDrama: 2,
        firstName: "John",
        lastName: "Doe",
        profileImage: "/demogalleryimages/sample1.jpg",
    };

    const careerData = Object.entries(sampleTeamMember).filter(([key]) =>
        ['shortFilms', 'featureFilms', 'webSeries', 'documentaries', 'musicVideos', 'theatreDrama'].includes(key)
    ).map(([name, value]) => ({ name, value }));

    const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    const CareerSummaryChart = () => (
        <div className="bg-background-light p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Career Summary</h3>
            <div className="flex items-center">
                <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                        <Pie
                            data={careerData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {careerData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col space-y-2">
                    {careerData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="text-sm text-white">{entry.name}: {entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const sampleGalleryImages = [
        { id: 1, imageUrl: "/demogalleryimages/sample1.jpg" },
        { id: 2, imageUrl: "/demogalleryimages/sample2.jpg" },
        { id: 3, imageUrl: "/demogalleryimages/sample3.jpg" },
        { id: 4, imageUrl: "/demogalleryimages/sample4.jpg" },
    ];

    const sampleShowReels = [
        { id: 1, title: "Demo Reel 1", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "/demogalleryimages/sample2.jpg" },
        { id: 2, title: "Demo Reel 2", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnailUrl: "/demogalleryimages/sample3.jpg" },
    ];

    const sampleAudioReels = [
        { id: 1, title: "Voice Over Demo", audioUrl: "/path/to/audio1.mp3", duration: "2:30" },
        { id: 2, title: "Music Composition", audioUrl: "/path/to/audio2.mp3", duration: "3:45" },
    ];

    const sampleReviews = [
        { id: 1, author: "Jane Smith", content: "Excellent work ethic and creativity!", rating: 5 },
        { id: 2, author: "John Doe", content: "A pleasure to work with on set.", rating: 4 },
    ];

    const demoContent = {
        'Comprehensive Profiles': (
            <div className="bg-background-light p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Team Member Profile</h3>
                <p className="text-gray-300">Name: {sampleTeamMember.firstName} {sampleTeamMember.lastName}</p>
                <p className="text-gray-300">Short Films: {sampleTeamMember.shortFilms}</p>
                <p className="text-gray-300">Feature Films: {sampleTeamMember.featureFilms}</p>
                {/* Add more profile details as needed */}
            </div>
        ),
        'ShowReels with Timestamps': (
            <AppMaxWidthContainer>
                <div className="flex flex-col gap-y-5 md:gap-x-10">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className={styles.titleHeading}>SHOWREELS</span>
                            <h1 className={`${styles.heading} text-4xl`}>
                                My <span className={styles.textHGradient}>SHOWREELS</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`flex justify-center gap-5`}>
                        <ShowReels uid="sample" teamMemberId="sample" showReels={sampleShowReels} />
                    </div>
                </div>
            </AppMaxWidthContainer>
        ),
        'Career Summary Metrics': <CareerSummaryChart />,
        'Gallery': (
            <AppMaxWidthContainer>
                <div className="flex flex-col gap-y-5 md:gap-x-10">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className={styles.titleHeading}>GALLERY</span>
                            <h1 className={`${styles.heading} text-4xl`}>
                                My <span className={styles.textHGradient}>GALLERY</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`flex flex-col`}>
                        <ImageGallery uid="sample" galleryImages={sampleGalleryImages} teamMemberId="sample" />
                    </div>
                </div>
            </AppMaxWidthContainer>
        ),
        'Audio Reels': (
            <AppMaxWidthContainer>
                <div className="flex flex-col gap-y-5 md:gap-x-10">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className={styles.titleHeading}>AUDIO REELS</span>
                            <h1 className={`${styles.heading} text-4xl`}>
                                My <span className={styles.textHGradient}>AUDIO REELS</span>
                            </h1>
                        </div>
                    </div>
                    <div className={`flex justify-center gap-5`}>
                        <AudioReels uid="sample" teamMemberId="sample" audioReels={sampleAudioReels} />
                    </div>
                </div>
            </AppMaxWidthContainer>
        ),
        'Reviews': (
            <AppMaxWidthContainer>
                <div className="flex flex-col gap-y-5 md:gap-x-10">
                    <div className="flex flex-col">
                        <span className={styles.titleHeading}>REVIEWS</span>
                        <h1 className={`${styles.heading} text-4xl`}>
                            My <span className={styles.textHGradient}>REVIEWS</span>
                        </h1>
                    </div>
                    <Reviews uid="sample" teamMemberId="sample" teamMemberReviews={sampleReviews} />
                </div>
            </AppMaxWidthContainer>
        ),
    };

    return (
        <div className="w-full bg-black text-[#ffffffcc]">
            {demoContent[feature] || <div className="text-white">Demo not available</div>}
        </div>
    );
};

export default FeatureDemo;