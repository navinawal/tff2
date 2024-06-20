"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getAllJobs() {
	try {
		const companiesRef = adminDb.collection("companies");
		const companiesSnapshot = await companiesRef.get();

		let allJobPosts = [];

		for (const companyDoc of companiesSnapshot.docs) {
			const uid = companyDoc.id;
			const jobPostsRef = companiesRef.doc(uid).collection("job_posts");
			const jobPostsSnapshot = await jobPostsRef.get();

			const jobPosts = jobPostsSnapshot.docs.map((doc) => ({
				id: doc.id,
				uid,
				...doc.data(),
			}));
			allJobPosts = [...allJobPosts, ...jobPosts];
		}

		return JSON.parse(JSON.stringify(allJobPosts));
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveJobPost(uid, jobData) {
	try {
		const jobPostsRef = adminDb.collection("companies").doc(uid).collection("job_posts");

		const jobDocRef = jobPostsRef.doc();

		await jobDocRef.set({
			...jobData,
			createdAt: adminDb.FieldValue.serverTimestamp(),
		});

		return { success: true, jobId: jobDocRef.id };
	} catch (error) {
		return { error: error.message };
	}
}
