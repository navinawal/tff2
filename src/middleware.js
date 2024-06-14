import { NextResponse } from "next/server";

export async function middleware(request) {
	const authToken = request.cookies.get("authToken");
	// console.log("authToken:", authToken);

	if (!authToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();

	// try {
	// 	const response = await fetch(new URL("/api/auth/verifyToken", request.url), {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ authToken }),
	// 	});

	// 	if (response.ok) {
	// 		const data = await response.json();
	// 		if (data.valid) {
	// 			return NextResponse.next();
	// 		}
	// 	}

	// 	return NextResponse.redirect(new URL("/login", request.url));
	// } catch (error) {
	// 	return NextResponse.redirect(new URL("/login", request.url));
	// }
}

export const config = {
	// matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
	matcher: ["/account/:path*"],
};
