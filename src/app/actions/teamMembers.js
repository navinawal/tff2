"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getTeamMemberDetails(uid) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const teamMemberDoc = await teamMemberRef.get();

		if (!teamMemberDoc.exists) {
			return { error: "Teammember not found" };
		}

		return teamMemberDoc.data();
		// return { success: true, message: "Profile saved" };
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberDetails(uid, profileData) {
	const teamMemberRef = adminDb.collection("team_members").doc(uid);
	await teamMemberRef.set(profileData, { merge: true });
}
