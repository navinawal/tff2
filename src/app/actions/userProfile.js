"use server";

import { adminDb } from "@/lib/firebase-admin";
import { ChooseRoleSchema, profileFormSchema } from "@/schemas/Schemas";

export async function getUserProfile(uid) {
	try {
		const profileDocRef = adminDb.collection("users_profile").doc(uid);
		const profileDoc = await profileDocRef.get();

		if (!profileDoc.exists) {
			return { error: "profile not found" };
		}

		return profileDoc.data();
		// return { success: true, message: "Profile saved" };
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveUserProfile(uid, profileData) {
	const validatedFields = profileFormSchema.safeParse(profileData);

	if (!validatedFields.success) {
		return { success: false, message: "invalid fields" };
	}

	try {
		const profileDocRef = adminDb.collection("users_profile").doc(uid);
		await profileDocRef.set(profileData, { merge: true });
		return { success: true, message: "Profile saved" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function saveRole(uid, roleData) {
	console.log(uid);
	const validatedFields = ChooseRoleSchema.safeParse(roleData);

	if (!validatedFields.success) {
		return { success: false, message: "invalid fields" };
	}

	try {
		const profileDocRef = adminDb.collection("users_profile").doc(uid);
		await profileDocRef.set(validatedFields.data, { merge: true });
		return { success: true, message: "Profile saved" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}
