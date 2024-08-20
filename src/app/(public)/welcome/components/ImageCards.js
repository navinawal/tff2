"use client";
import React from 'react';
import Image from 'next/image';

const ImageCards = () => {
    const images = [
        '/images/resource/COMPREHENSIVE-PROFILE-2.png',
        '/images/resource/timestamps-opt-2.png',
        '/images/resource/CHARTS-2.png',
    ];

    return (
        <div className="relative h-60 w-full max-w-md mx-auto">
            {images.map((src, index) => (
                <div
                    key={index}
                    className="absolute w-40 h-56 transition-all duration-300 ease-in-out hover:z-10 hover:scale-110"
                    style={{
                        top: `${index * 10}px`,
                        left: `${index * 20}px`,
                        transform: `rotate(${index * 5 - 5}deg)`,
                        zIndex: index,
                    }}
                >
                    <Image
                        src={src}
                        alt={`Feature ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageCards;