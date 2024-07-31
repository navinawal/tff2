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

export async function addTeamMemberReview(teamMemberId, data) {
	try {
		if (!teamMemberId) {
			return { success: false, message: "teamMemberId is required" };
		}

		await adminDb
			.collection("team_members")
			.doc(teamMemberId)
			.collection("reviews")
			.add({
				...data,
				createdAt: FieldValue.serverTimestamp(),
				updatedAt: FieldValue.serverTimestamp(),
			});

		revalidatePath(`/`);

		return { success: true, message: "Review added successfully" };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function getTeamMemberReviews(teamMemberId) {
	try {
		if (!teamMemberId) {
			return { error: "teamMemberId is required" };
		}

		// Fetch all reviews for the team member
		const reviewsSnapshot = await adminDb.collection("team_members").doc(teamMemberId).collection("reviews").get();

		const reviews = reviewsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		// Calculate the average rating
		let totalRating = 0;
		reviews.forEach((review) => {
			if (review.rating) {
				totalRating += review.rating;
			}
		});
		const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

		// Fetch the team member details for each reviewedBy field in reviews
		const teamMemberDetailsPromises = reviews.map(async (review) => {
			if (review.reviewedBy) {
				const reviewedByDoc = await adminDb.collection("team_members").doc(review.reviewedBy).get();
				return {
					...review,
					reviewedByDetails: reviewedByDoc.exists ? reviewedByDoc.data() : null,
				};
			}
			return review;
		});

		const reviewsWithDetails = await Promise.all(teamMemberDetailsPromises);

		// Return reviews, average rating, and team member details from reviewedBy field
		return JSON.parse(
			JSON.stringify({
				reviews: reviewsWithDetails,
				averageRating,
			})
		);
	} catch (error) {
		return { error: error.message };
	}
}
