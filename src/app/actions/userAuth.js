"use server";

import { firebaseAdmin } from "@/lib/firebase-admin";
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

export async function getCurrentUser() {
	const authToken = await getAuthToken();

	if (!(await isUserAuthenticated(authToken))) {
		return null;
	}

	const decodedIdToken = await firebaseAdmin.verifySessionCookie(authToken);
	const currentUser = await firebaseAdmin.getUser(decodedIdToken.uid);

	return currentUser;
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
	const decodedIdToken = await firebaseAdmin.verifySessionCookie(authToken);
	await firebaseAdmin.revokeRefreshTokens(decodedIdToken.sub);
	cookies().delete("authToken");
}
