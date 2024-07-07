"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getTeamMemberTrainings(teamMemberId) {
	try {
		const trainingsRef = adminDb.collection("team_members").doc(teamMemberId).collection("trainings");
		const snapshot = await trainingsRef.get();

		if (snapshot.empty) {
			return { error: "No trainings found for this team member" };
		}

		const trainings = snapshot.docs.map((doc) => ({ teamMemberId: teamMemberId, id: doc.id, ...doc.data() }));
		return trainings;
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberTrainings(teamMemberId, data) {
	try {
		const trainingRef = adminDb.collection("team_members").doc(teamMemberId).collection("trainings").doc();
		await trainingRef.set(data, { merge: true });
		return { success: true, message: "Training added successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

/**
 * Removes an Audio Training from a team member's Trainings.
 * @param {string} training - The UID of the team member.
 * @param {string} trainingId - The ID of the  training Id to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const removeTraining = async (teamMemberId, trainingId) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("trainings").doc(trainingId);
		await ref.delete();
		return { success: true, message: "Training removed successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
