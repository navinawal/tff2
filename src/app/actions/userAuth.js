"use server";

import { adminDb, firebaseAdmin } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

async function getAuthToken() {
	try {
		return cookies().get("authToken")?.value;
	} catch (error) {
		return undefined;
	}
}

export async function isUserAuthenticated(authToken) {
	const _authToken = authToken ?? (await getAuthToken());
	if (!_authToken) return false;

	try {
		const isRevoked = !(await firebaseAdmin.verifySessionCookie(_authToken, true));
		return !isRevoked;
	} catch (error) {
		return false;
	}
}

export async function getCurrentUser(authToken) {
	const _authToken = authToken ?? (await getAuthToken());
	if (!_authToken) return false;

	if (!(await isUserAuthenticated(_authToken))) {
		return null;
	}

	const decodedIdToken = await firebaseAdmin.verifySessionCookie(_authToken);
	const currentUser = await firebaseAdmin.getUser(decodedIdToken.uid);

	const profileDocRef = adminDb.collection("users_profile").doc(decodedIdToken.uid);
	const profileDoc = await profileDocRef.get();

	if (!profileDoc.exists) {
		return JSON.parse(JSON.stringify({ uid: currentUser.uid, profile: null }));
		// return { uid: currentUser.uid, profile: null };
	}

	const profileData = profileDoc.data();

	return JSON.parse(JSON.stringify({ uid: currentUser.uid, profile: profileData }));
	// return { uid: currentUser.uid, profile: profileData };
}

export async function setAuthCookie(authToken) {
	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
	try {
		const sessionCookie = await firebaseAdmin.createSessionCookie(authToken, { expiresIn });
		cookies().set("authToken", sessionCookie, {
			maxAge: expiresIn / 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
		});
	} catch (error) {
		return null;
	}
}

export async function revokeAllSessions() {
	const authToken = await getAuthToken();
	if (!authToken) return;
	const decodedIdToken = await firebaseAdmin.verifySessionCookie(authToken);
	await firebaseAdmin.revokeRefreshTokens(decodedIdToken.sub);
	cookies().delete("authToken");
}
