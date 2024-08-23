"use client";

import React from 'react';
import TeamMemberCard from "@/components/Card/TeamMember";

const RandomTeamMembers = ({ teamMembers }) => {
    // Check if teamMembers is an array and not empty
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
        return null; // Or you could return a message like "No team members available"
    }

    // Select 3-5 random team members
    const randomMembers = [...teamMembers] // Create a copy of the array
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 3);

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {randomMembers.map((member) => (
                <TeamMemberCard key={member.uid} teamMember={member} />
            ))}
        </div>
    );
};

export default RandomTeamMembers;