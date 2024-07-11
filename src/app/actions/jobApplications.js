"use server";

import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { JobApplicationFromSchema } from "@/schemas/Schemas";

export async function savJobApplication(teamMemberId, companyId, jobPostId, applicationData) {
	try {
		// const parsedData = JobApplicationFromSchema.parse(applicationData);

		const jobApplicationRef = adminDb.collection("job_applications");

		const jobApplicationDocRef = jobApplicationRef.doc();

		const jobApplicationDataWithTimestamp = {
			teamMemberId,
			companyId,
			jobPostId,
			...applicationData,
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

export async function updateJobApplication(jobApplicationId, data) {
	try {
		if (!jobApplicationId) {
			return { success: false, message: "Job application id is required" };
		}

		await adminDb
			.collection("job_applications")
			.doc(jobApplicationId)
			.update({
				...data,
				updatedAt: FieldValue.serverTimestamp(),
			});
		return { success: true, message: "Application saved!" };
	} catch (error) {
		return { success: false, error: error.message };
	}
}

export async function getJobApplication(jobApplicationId) {
	try {
		if (!jobApplicationId) {
			return { error: "Job application id is required" };
		}

		const jobApplicationDoc = await adminDb.collection("job_applications").doc(jobApplicationId).get();

		if (!jobApplicationDoc.exists) {
			return { error: "Job application not found" };
		}

		const jobApplication = jobApplicationDoc.data();

		let teamMemberDetails = {};
		if (jobApplication.teamMemberId) {
			const teamMemberDoc = await adminDb.collection("team_members").doc(jobApplication.teamMemberId).get();

			if (teamMemberDoc.exists) {
				teamMemberDetails = teamMemberDoc.data();
			}
		}

		return {
			...jobApplication,
			teamMemberDetails,
		};
	} catch (error) {
		return { error: error.message };
	}
}

export async function deleteJobApplication(jobApplicationId) {
	try {
		const ref = adminDb.collection("job_applications").doc(jobApplicationId);
		await ref.delete();
		return { success: true, message: "Application removed successfully." };
	} catch (error) {
		return { success: false, message: error.message };
	}
}
