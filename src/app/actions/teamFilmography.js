"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

export async function getTeamMemberFilmographies(uid) {
	try {
		const filmographiesRef = adminDb.collection("team_members").doc(uid).collection("filmographies");
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

export async function getTeamMemberFilmography(teamMemberId, filmographyId) {
	try {
		if (!teamMemberId || !filmographyId) {
			return { error: "TeammemberId and filmographyId are required" };
		}

		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("filmographies").doc(filmographyId);
		const doc = await ref.get();

		if (doc.empty) {
			return { error: "No data found" };
		}

		const filmography = {
			teamMemberId,
			id: doc.id,
			...doc.data(),
		};
		return JSON.parse(JSON.stringify(filmography));
	} catch (error) {
		return { error: error.message };
	}
}

export async function addFilmography(teamMemberId, data) {
	try {
		if (!teamMemberId) {
			return { success: false, message: "TeamMemberId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("filmographies")
			.add({
				...data,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath("/");

		return { success: true, message: "Filmography saved successfully" };
	} catch (error) {
		console.log(error);
		return { success: false, message: error.message };
	}
}

export async function editFilmography(teamMemberId, filmographyId, data) {
	try {
		if (!teamMemberId) {
			return { success: false, message: "TeamMemberId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("filmographies")
			.doc(filmographyId)
			.update({
				...data,
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath("/");

		return { success: true, message: " Filmography updated successfully" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function deleteFilmography(teamMemberId, filmographyId) {
	try {
		if (!teamMemberId || !filmographyId) {
			return { success: false, message: "TeammemberId and filmographyId are required" };
		}

		await adminDb.collection("team_members").doc(teamMemberId).collection("filmographies").doc(filmographyId).delete();

		return { success: true, message: " Filmography deleted successfully" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}
