"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { JobPostFormSchema } from "@/schemas/Schemas";

export async function getAllJobPosts() {
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

export async function getCompanyJobPost(uid) {
	try {
		const jobPostsRef = adminDb.collection("companies").doc(uid).collection("job_posts");
		const jobPostsSnapshot = await jobPostsRef.get();

		let allJobPosts = [];

		const jobPosts = jobPostsSnapshot.docs.map((doc) => ({
			id: doc.id,
			uid,
			...doc.data(),
		}));

		allJobPosts = [...allJobPosts, ...jobPosts];

		return JSON.parse(JSON.stringify(allJobPosts));
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveJobPost(uid, jobData) {
	try {
		const parsedData = JobPostFormSchema.parse(jobData);

		const jobPostsRef = adminDb.collection("companies").doc(uid).collection("job_posts");

		const jobDocRef = jobPostsRef.doc();

		const jobDataWithTimestamp = {
			...parsedData,
			createdAt: FieldValue.serverTimestamp(),
		};

		await jobDocRef.set(jobDataWithTimestamp);

		return { success: true, jobId: jobDocRef.id };
	} catch (error) {
		console.error(error.message);
		return { error: error.message };
	}
}
