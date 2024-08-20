"use client";
import React, { useState } from 'react';

const VideoDemo = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [timestamps, setTimestamps] = useState([
        { time: 0, label: "Intro" },
        { time: 30, label: "Verse 1" },
        { time: 60, label: "Chorus" },
        { time: 90, label: "Verse 2" },
    ]);
    const [newTimestamp, setNewTimestamp] = useState({ time: '', label: '' });

    const handleTimestampClick = (time) => {
        setCurrentTime(time);
        // Implementation for video seeking
    };

    const addTimestamp = () => {
        if (newTimestamp.time && newTimestamp.label) {
            setTimestamps([...timestamps, newTimestamp]);
            setNewTimestamp({ time: '', label: '' });
        }
    };

    return (
        <div>
            <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?start=${currentTime}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {timestamps.map((stamp, index) => (
                    <button
                        key={index}
                        onClick={() => handleTimestampClick(stamp.time)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        {stamp.label} ({stamp.time}s)
                    </button>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={newTimestamp.time}
                    onChange={(e) => setNewTimestamp({ ...newTimestamp, time: e.target.value })}
                    placeholder="Time (seconds)"
                    className="border p-1 rounded"
                />
                <input
                    type="text"
                    value={newTimestamp.label}
                    onChange={(e) => setNewTimestamp({ ...newTimestamp, label: e.target.value })}
                    placeholder="Label"
                    className="border p-1 rounded"
                />
                <button onClick={addTimestamp} className="bg-green-500 text-white px-2 py-1 rounded">
                    Add Timestamp
                </button>
            </div>
        </div>
    );
};

export default VideoDemo;