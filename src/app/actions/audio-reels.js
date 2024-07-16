"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

// Utility function to convert Firestore Timestamps to JavaScript Dates
function transformTimestamps(doc) {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		createdAt: data.createdAt ? data.createdAt.toDate() : null,
		updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
	};
}

/**
 * Adds a new Audio Reel to a team member.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {object} data - The data object containing URL and others.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function addAudioReel(teamMemberId, data) {
	try {
		if (!teamMemberId) {
			return { success: false, message: "teamMemberId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("audio_reels")
			.add({
				...data,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath(`/`);

		return { success: true, message: "Audio Reel added successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

/**
 * Update an Audio Reel from a team member's Audio Reels.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} audioReelId - The ID of the  Audio Reel to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function updateAudioReel(teamMemberId, audioReelId, data) {
	try {
		if (!teamMemberId || !audioReelId) {
			return { success: false, message: "teamMemberId and AudioReelId are required" };
		}
		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("audio_reels")
			.doc(audioReelId)
			.update({
				...data,
				updatedAt: FieldValue.serverTimestamp(),
			});
		revalidatePath(`/`);
		return { success: true, message: "Audio Reel updated successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

/**
 * Delelte an Audio Reel from a team member's Audio Reels.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} audioReelId - The ID of the  Audio Reel to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function deleteAudioReel(teamMemberId, audioReelId) {
	try {
		if (!teamMemberId || !audioReelId) {
			return { success: false, message: "teamMemberId and AudioReelId are required" };
		}
		await adminDb.collection("team_members").doc(teamMemberId).collection("audio_reels").doc(audioReelId).delete();

		revalidatePath(`/`);

		return { success: true, message: "Audio Reel removed successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

/**
 * Fetches all Audio Reels for a specific team member.
 * Converts Firestore Timestamps to JavaScript Dates for client compatibility.
 * @param {string} teamMemberId - The UID of the team member.
 * @returns {Promise<{ data?: Array, error?: string }>}
 */
export async function getAudioReels(teamMemberId) {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("audio_reels");

		const snapshot = await ref.get();

		if (snapshot.empty) {
			return [];
		}

		const audioReels = snapshot.docs.map((doc) => transformTimestamps(doc));

		return JSON.parse(JSON.stringify(audioReels));
	} catch (error) {
		return { error: error.message };
	}
}
