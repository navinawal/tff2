"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getAllTeamMembers() {
	try {
		const teamMembersRef = adminDb.collection("teamMembers");
		const teamMembersSnapshots = await teamMembersRef.get();
		if (!teamMembersSnapshots.exists) {
			return { error: "No TeamMember data found" };
		}

		let allTeamMembers = [];

		const teamMembers = teamMembersSnapshots.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));
		allTeamMembers = [...allTeamMembers, ...teamMembers];

		return JSON.parse(JSON.stringify(allTeamMembers));
	} catch (error) {
		return { error: error.message };
	}
}

export async function getTeamMemberDetails(uid) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const snapshot = await teamMemberRef.get();

		if (!snapshot.exists) {
			return { error: "No company data found" };
		}

		const teamMemberProfile = {
			uid: snapshot.id,
			...snapshot.data(),
		};

		return teamMemberProfile;
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberDetails(uid, data) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const response = await teamMemberRef.set(data, { merge: true });
		return { response: true };
	} catch (error) {
		return { error: error.message };
	}
}
