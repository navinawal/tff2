"use server";

import { FieldValue, adminDb } from "@/lib/firebase-admin";
import { ChooseRoleSchema, profileFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberDetails } from "@/app/actions/team_members";

/**
 * Create a new user profile or overwrite an existing one.
 * @param {string} uid - The unique user ID.
 * @param {Object} profileData - The user profile data.
 * @returns {Object} - Result object with success status and message.
 */
export async function createUserProfile(uid, profileData) {
	try {
		const timestamp = FieldValue.serverTimestamp();
		await adminDb
			.collection("users_profile")
			.doc(uid)
			.set(
				{
					...profileData,
					createdAt: timestamp,
					updatedAt: timestamp,
				},
				{ merge: true }
			);
		return { success: true, message: "Profile created successfully", data: profileData };
	} catch (error) {
		return { success: false, message: `Error creating profile: ${error.message}` };
	}
}

/**
 * Update an existing user profile.
 * @param {string} uid - The unique user ID.
 * @param {Object} profileData - The updated user profile data.
 * @returns {Object} - Result object with success status and message.
 */
export async function updateUserProfile(uid, profileData) {
	try {
		await adminDb
			.collection("users_profile")
			.doc(uid)
			.update({
				...profileData,
				updatedAt: FieldValue.serverTimestamp(),
			});
		return { success: true, message: "Profile updated successfully", data: profileData };
	} catch (error) {
		return { success: false, message: `Error updating profile: ${error.message}` };
	}
}

/**
 * Get a user profile by UID.
 * @param {string} uid - The unique user ID.
 * @returns {Object} - Result object with success status, message, and data.
 */
export async function getUserProfile(uid) {
	try {
		const profileDoc = await adminDb.collection("users_profile").doc(uid).get();
		if (!profileDoc.exists) {
			return { success: false, message: "User profile not found" };
		}
		return { success: true, message: "Profile retrieved successfully", data: JSON.parse(JSON.stringify(profileDoc.data())) };
	} catch (error) {
		return { success: false, message: `Error retrieving profile: ${error.message}` };
	}
}

/**
 * Save user role and handle role-specific operations.
 * @param {string} uid - The unique user ID.
 * @param {Object} data - The role data to save.
 * @returns {Object} - Result object with success status and message.
 */
export async function saveRole(uid, data) {
	const validatedFields = ChooseRoleSchema.safeParse(data);

	if (!validatedFields.success) {
		return { success: false, message: "Invalid fields" };
	}

	try {
		const timestamp = FieldValue.serverTimestamp();
		const { role } = validatedFields.data;
		const profileDocRef = adminDb.collection("users_profile").doc(uid);
		const profileDoc = await profileDocRef.get();
		const profileData = profileDoc.data();

		const updateResult = await updateUserProfile(uid, {
			...validatedFields.data,
		});

		if (!updateResult.success) {
			return updateResult;
		}

		if (role === "Company") {
			const companyRef = adminDb.collection("companies").doc(uid);
			await companyRef.set(
				{
					createdAt: timestamp,
					updatedAt: timestamp,
				},
				{ merge: true }
			);
		} else if (role === "TeamMember") {
			const { firstName, lastName } = profileData;
			await saveTeamMemberDetails(uid, { firstName, lastName });
		}

		return { success: true, message: "Role saved successfully" };
	} catch (error) {
		return { success: false, message: `Error saving role: ${error.message}` };
	}
}

/**
 * Delete a user profile by UID.
 * @param {string} uid - The unique user ID.
 * @returns {Object} - Result object with success status and message.
 */
export async function deleteUserProfile(uid) {
	try {
		await adminDb.collection("users_profile").doc(uid).delete();
		return { success: true, message: "Profile deleted successfully" };
	} catch (error) {
		return { success: false, message: `Error deleting profile: ${error.message}` };
	}
}
