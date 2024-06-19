"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getCompanyProfile(uid) {
	try {
		const companyRef = adminDb.collection("companies").doc(uid);
		const companyDoc = await companyRef.get();

		if (!companyDoc.exists) {
			return { error: "Company Profile not found" };
		}

		// const profile = companyDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		return companyDoc.data();
	} catch (error) {
		return { error: error.message };
	}
}

export async function saveCompanyDetails(uid, data) {
	try {
		const companyRef = adminDb.collection("companies").doc(uid);
		const response = await companyRef.set(data, { merge: true });

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
}
