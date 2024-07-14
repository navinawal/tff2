"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

export async function getTeamMemberTrainings(teamMemberId) {
	try {
		const trainingsRef = adminDb.collection("team_members").doc(teamMemberId).collection("trainings");
		const snapshot = await trainingsRef.get();

		if (snapshot.empty) {
			return { error: "No trainings found for this team member" };
		}

		const trainings = snapshot.docs.map((doc) => ({ teamMemberId: teamMemberId, id: doc.id, ...doc.data() }));
		return JSON.parse(JSON.stringify(trainings));
	} catch (error) {
		return { error: error.message };
	}
}

export async function addTraining(teamMemberId, data) {
	try {
		if (!teamMemberId) {
			return { success: false, message: "TeamMemberId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("trainings")
			.add({
				...data,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath("/");

		return { success: true, message: "Training saved successfully" };
	} catch (error) {
		console.log(error);
		return { success: false, message: error.message };
	}
}

export async function editTraining(teamMemberId, trainingId, data) {
	try {
		if (!teamMemberId || !trainingId) {
			return { success: false, message: "TeamMemberId and trainingId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("trainings")
			.doc(trainingId)
			.update({
				...data,
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath("/");

		return { success: true, message: " Training updated successfully" };
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
export const deleteTraining = async (teamMemberId, trainingId) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("trainings").doc(trainingId);
		await ref.delete();
		revalidatePath("/");
		return { success: true, message: "Training removed successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
