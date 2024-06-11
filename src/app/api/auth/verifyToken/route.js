import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebase-admin";

export async function POST(request) {
	const { token } = await request.json();

	if (!token) {
		return NextResponse.json({ error: "No token provided" }, { status: 400 });
	}

	try {
		const decodedToken = await firebaseAdmin.verifyIdToken(token);
		return NextResponse.json({ valid: true, decodedToken }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
	}
}
