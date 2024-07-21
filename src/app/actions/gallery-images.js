"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

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
 * Adds a new image to a team member's gallery.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {object} data - The image data object containing URL and caption.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const addImageToGallery = async (teamMemberId, data) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("gallery_images").doc();

		await ref.set(
			{
				...data,
				createdAt: FieldValue.serverTimestamp(),
				uploadedAt: FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);

		return { success: true, message: "Image added successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Fetches all gallery images for a specific team member.
 * Converts Firestore Timestamps to JavaScript Dates for client compatibility.
 * @param {string} teamMemberId - The UID of the team member.
 * @returns {Promise<{ data?: Array, error?: string }>}
 */
export const getAllGalleryImages = async (teamMemberId) => {
	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("gallery_images");

		const snapshot = await ref.get();

		if (snapshot.empty) {
			return [];
		}

		const galleryImages = snapshot.docs.map((doc) => transformTimestamps(doc));

		return JSON.parse(JSON.stringify(galleryImages));
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Bulk uploads multiple images to a team member's gallery.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {Array} images - Array of image objects containing URL and caption.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const bulkUploadImagesToGallery = async (teamMemberId, images) => {
	const batch = adminDb.batch();

	try {
		const ref = adminDb.collection("team_members").doc(teamMemberId).collection("gallery_images");

		images.forEach((image) => {
			const newImageRef = ref.doc();
			batch.set(newImageRef, {
				...image,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});
		});

		await batch.commit();

		revalidatePath(`/`);

		return { success: true, message: "Images uploaded successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

/**
 * Removes an image from a team member's gallery.
 * @param {string} teamMemberId - The UID of the team member.
 * @param {string} imageId - The ID of the image to remove.
 * @returns {Promise<{ success: boolean, message?: string }>}
 */

export async function deleteGalleryImage(teamMemberId, galleryId) {
	try {
		if (!teamMemberId || !galleryId) {
			return { success: false, message: "TeamMemberId and GalleryId are required" };
		}

		await adminDb.collection("team_members").doc(teamMemberId).collection("gallery_images").doc(galleryId).delete();
		revalidatePath(`/`);
		return { success: true, message: "Image Deleted successfully" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}
