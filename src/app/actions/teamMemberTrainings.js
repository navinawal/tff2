"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getTeamMemberTrainings(uid) {
	try {
		const trainingRef = adminDb.collection("team_members").doc(uid).collection("trainings").doc();
		const trainingDoc = await trainingRef.get();

		if (!trainingDoc.exists) {
			return { error: "Teammember not found" };
		}

		return trainingDoc.data();
		// return { success: true, message: "Profile saved" };
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberTrainings(uid, data) {
	try {
		const trainingRef = adminDb.collection("team_members").doc(uid).collection("trainings").doc();
		await trainingRef.set(data, { merge: true });
	} catch (error) {
		return { error: error.message };
	}
}
