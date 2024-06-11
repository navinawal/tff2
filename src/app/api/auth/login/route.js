import { NextResponse } from "next/server";
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const ERROR_MESSAGES = {
	"auth/user-not-found": "No user found with this email address.",
	"auth/wrong-password": "Incorrect password. Please try again.",
	"auth/invalid-email": "The email address is not valid.",
	"auth/user-disabled": "This user account has been disabled.",
	"auth/too-many-requests": "Too many unsuccessful login attempts. Please try again later.",
	default: "An error occurred. Please try again later.",
};

export async function POST(request) {
	const { email, password, provider } = await request.json();
	try {
		let userCredential;

		if (provider === "email") {
			userCredential = await signInWithEmailAndPassword(auth, email, password);
		} else if (provider === "google") {
			userCredential = await signInWithPopup(auth, googleProvider);
		} else if (provider === "facebook") {
			userCredential = await signInWithPopup(auth, facebookProvider);
		} else {
			return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
		}

		const user = userCredential.user;

		const token = await user.getIdToken();
		// const userDoc = await getUserDocument(user.uid);

		return NextResponse.json({ token });
	} catch (error) {
		const errorMessage = ERROR_MESSAGES[error.code] || ERROR_MESSAGES["default"];
		return NextResponse.json({ error: error }, { status: 400 });
	}
}
