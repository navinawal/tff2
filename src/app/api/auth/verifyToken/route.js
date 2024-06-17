import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/userAuth";

export async function POST(request) {
	const { authToken } = await request.json();

	if (!authToken) {
		return NextResponse.json({ error: "No token provided" }, { status: 400 });
	}

	try {
		const currentUser = await getCurrentUser(authToken);
		if (currentUser) {
			return NextResponse.json({ currentUser }, { status: 200 });
		}
		return NextResponse.json({ error: "token expired" }, { status: 401 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 401 });
	}
}
