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
