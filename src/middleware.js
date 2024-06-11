import { NextResponse } from "next/server";

export async function middleware(request) {
	const token = request.cookies.get("token");
	// console.log("token:", token);

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();

	// try {
	// 	const response = await fetch(new URL("/api/auth/verifyToken", request.url), {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ token }),
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
