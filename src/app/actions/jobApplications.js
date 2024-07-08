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

		return { success: true, message: "Application Submit", jobApplicationId: jobApplicationDocRef.id };
	} catch (error) {
		return { success: false, message: error.message };
	}
}

export async function fetchJobApplicationsForCompany(companyId) {
	const jobApplicationsRef = adminDb.collection("job_applications").where("companyId", "==", companyId);
	const jobApplicationsSnapshot = await jobApplicationsRef.get();

	if (jobApplicationsSnapshot.empty) {
		return { error: "No Job applications found for company " + companyId };
	}

	const applications = jobApplicationsSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return JSON.parse(JSON.stringify(applications));
}

export async function fetchApplicationsForTeamMember(teamMemberId) {
	const jobApplicationsRef = adminDb.collection("job_applications").where("teamMemberId", "==", teamMemberId);
	const jobApplicationsSnapshot = await jobApplicationsRef.get();

	if (jobApplicationsSnapshot.empty) {
		return { error: "No Job applications found for TeamMember " + teamMemberId };
	}

	const applications = jobApplicationsSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return JSON.parse(JSON.stringify(applications));
}
