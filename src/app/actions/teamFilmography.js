"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getTeamMemberFilmographies(uid) {
	try {
		const filmographiesRef = adminDb.collection("team_members").doc(uid).collection("Filmographies");
		const snapshot = await filmographiesRef.get();

		if (snapshot.empty) {
			return { error: "No trainings found for this Filmographies" };
		}

		const filmographies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return JSON.parse(JSON.stringify(filmographies));
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberFilmographies(uid, data) {
	try {
		const trainingRef = adminDb.collection("team_members").doc(uid).collection("Filmographies").doc();
		await trainingRef.set(data, { merge: true });
		return true;
	} catch (error) {
		return { error: error.message };
	}
}
