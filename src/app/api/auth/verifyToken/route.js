import { NextResponse } from "next/server";
import { isUserAuthenticated } from "@/app/actions/userAuth";

export async function POST(request) {
	const { authToken } = await request.json();

	if (!authToken) {
		return NextResponse.json({ error: "No token provided" }, { status: 400 });
	}

	try {
		const valid = await isUserAuthenticated(authToken);
		return NextResponse.json({ valid }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 401 });
	}
}
