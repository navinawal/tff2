"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";

// Utility function to convert Firestore Timestamps to JavaScript Dates
const transformTimestamps = (doc) => {
	const data = doc.data();
	return {
		id: doc.id,
		...data,
		createdAt: data.createdAt ? data.createdAt.toDate() : null,
		updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
	};
};

/**
 * Adds a new Show Reel to a team member's gallery.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {object} data - The data object containing URL and others.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const addShowReel = async (teamMemberId, data) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("show_reels").doc();

		await ref.set(
			{
				...data,
				createdAt: FieldValue.serverTimestamp(),
				uploadedAt: FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);

		return { success: true, message: "Show Reel added successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Removes an Show Reel from a team member's Show Reels.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} showReelId - The ID of the  Show Reel to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const removeShowReel = async (teamMemberId, showReelId) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("show_reels").doc(showReelId);
		await ref.delete();
		return { success: true, message: "Show Reel removed successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Removes an Show Reel from a team member's Show Reels.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} audioReelId - The ID of the  Show Reel to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const updateShowReel = async (teamMemberId, audioReelId) => {
	// try {
	// 	const galleryRef = adminDb.collection("team_members").doc(teamMemberId).collection("audio_reels").doc(audioReelId);
	// 	await galleryRef.delete();
	// 	return { success: true, message: "Show Reel removed successfully." };
	// } catch (error) {
	// 	return { success: false, message: error.message };
	// }
};

/**
 * Fetches all Show Reels for a specific team member.
 * Converts Firestore Timestamps to JavaScript Dates for client compatibility.
 * @param {string} teamMemberId - The UID of the team member.
 * @returns {Promise<{ data?: Array, error?: string }>}
 */
export const getAllShowReels = async (teamMemberId) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("show_reels");

		const snapshot = await ref.get();

		if (snapshot.empty) {
			return [];
		}

		const audioReels = snapshot.docs.map((doc) => transformTimestamps(doc));

		return JSON.parse(JSON.stringify(audioReels));
	} catch (error) {
		return { error: error.message };
	}
};
