"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";

export async function getAllTeamMembers() {
	try {
		const teamMembersRef = adminDb.collection("teamMembers");
		const teamMembersSnapshots = await teamMembersRef.get();
		if (!teamMembersSnapshots.exists) {
			return { error: "No TeamMember data found" };
		}

		let allTeamMembers = [];

		const teamMembers = teamMembersSnapshots.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));
		allTeamMembers = [...allTeamMembers, ...teamMembers];

		return JSON.parse(JSON.stringify(allTeamMembers));
	} catch (error) {
		return { error: error.message };
	}
}

export async function getTeamMemberDetails(uid) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const snapshot = await teamMemberRef.get();

		if (!snapshot.exists) {
			return { error: "No company data found" };
		}

		const teamMemberProfile = {
			uid: snapshot.id,
			...snapshot.data(),
		};

		return JSON.parse(JSON.stringify(teamMemberProfile));
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveTeamMemberDetails(uid, data) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(uid);
		const response = await teamMemberRef.set(data, { merge: true });
		return { success: true, message: "Profile saved successfully" };
	} catch (error) {
		return { error: error.message };
	}
}

export async function addBookmarkToArray(teamMemberId, companyId, jobPostId) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);

		await teamMemberRef.update({
			bookmarkedJobPosts: FieldValue.arrayUnion({ companyId, jobPostId }),
		});
		return true;
	} catch (error) {
		return { error: error.message };
	}
}

export async function removeBookmarkFromArray(teamMemberId, companyId, jobPostId) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);

		await teamMemberRef.update({
			bookmarkedJobPosts: FieldValue.arrayRemove({ companyId, jobPostId }),
		});
		return true;
	} catch (error) {
		return { error: error.message };
	}
}

export async function getBookmarkedJobPosts(teamMemberId) {
	try {
		const teamMemberRef = adminDb.collection("team_members").doc(teamMemberId);
		const doc = await teamMemberRef.get();

		const bookmarkedJobPosts = doc.data()?.bookmarkedJobPosts || [];
		if (bookmarkedJobPosts.length === 0) return [];

		const jobPostPromises = bookmarkedJobPosts.map(async ({ companyId, jobPostId }) => {
			const jobPostRef = adminDb.collection(`companies/${companyId}/job_posts`).doc(jobPostId);
			const jobPostDoc = await jobPostRef.get();
			return { id: jobPostId, companyId, ...jobPostDoc.data() };
		});

		const jobPosts = await Promise.all(jobPostPromises);
		return JSON.parse(JSON.stringify(jobPosts));
	} catch (error) {
		console.error("Error fetching bookmarked job posts:", error);
		return { error: error.message };
	}
}
