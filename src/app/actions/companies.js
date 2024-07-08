"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getAllCompanies() {
	try {
		const companiesRef = adminDb.collection("companies");
		const snapshot = await companiesRef.get();

		if (snapshot.empty) {
			return { error: "No companies found" };
		}

		const companies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return JSON.parse(JSON.stringify(companies));
	} catch (error) {
		return { error: error.message };
	}
}

export async function getCompanyProfile(companyId) {
	try {
		const companyRef = adminDb.collection("companies").doc(companyId);
		const companyDoc = await companyRef.get();

		if (!companyDoc.exists) {
			return { error: "Company Profile not found" };
		}

		const companyDetails = companyDoc.data();

		return JSON.parse(JSON.stringify(companyDetails));
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
