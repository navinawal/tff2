"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { JobApplicationFromSchema } from "@/schemas/Schemas";

export async function savJobApplication(teamMemberId, companyId, jobPostId, applicationData) {
	try {
		const parsedData = JobApplicationFromSchema.parse(applicationData);

		const jobApplicationRef = adminDb.collection("job_applications");

		const jobApplicationDocRef = jobApplicationRef.doc();

		const jobApplicationDataWithTimestamp = {
			teamMemberId,
			companyId,
			jobPostId,
			...parsedData,
			createdAt: FieldValue.serverTimestamp(),
		};

		await jobApplicationDocRef.set(jobApplicationDataWithTimestamp);

		return { success: true, jobApplicationId: jobApplicationDocRef.id };
	} catch (error) {
		console.error(error.message);
		return { error: error.message };
	}
}
