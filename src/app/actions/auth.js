import { auth, db, googleProvider, facebookProvider } from "@/lib/firebase";
import { LoginSchema } from "@/schemas/Schemas";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ERROR_MESSAGES = {
	"auth/user-not-found": "No user found with this email address.",
	"auth/invalid-credential": "invalid credentials",
	"auth/wrong-password": "Incorrect password. Please try again.",
	"auth/invalid-email": "The email address is not valid.",
	"auth/user-disabled": "This user account has been disabled.",
	"auth/too-many-requests": "Too many unsuccessful login attempts. Please try again later.",
	default: "An error occurred. Please try again later.",
};

export const registerWithEmailPassword = async (name, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		if (user) {
			await updateProfile(user, {
				displayName: name,
			});
			await sendEmailVerification(user);
		}
		return { user: user };
	} catch (error) {
		throw error;
	}
};

export async function handleLogin({ email, password, provider }) {
	let userCredential;

	try {
		if (provider === "Email") {
			const validatedFields = LoginSchema.safeParse({ email, password });

			if (!validatedFields.success) {
				return { error: validatedFields.data.errors };
			}
			userCredential = await signInWithEmailAndPassword(auth, email, password);
		} else if (provider === "Google") {
			userCredential = await signInWithPopup(auth, googleProvider);
		} else if (provider === "Facebook") {
			userCredential = await signInWithPopup(auth, facebookProvider);
		} else {
			throw new Error("Invalid login provider.");
		}

		const token = await userCredential.user.getIdToken();
		const uid = userCredential.user.uid;

		// Check or create user document
		const userDoc = await checkOrCreateUserDocument(uid, userCredential.user.email);

		return { token: token, user: userDoc };
	} catch (error) {
		throw error;
	}
}

async function checkOrCreateUserDocument(uid, email) {
	const userDocRef = doc(db, "users", uid);
	const userDocSnap = await getDoc(userDocRef);

	if (!userDocSnap.exists()) {
		const userData = {
			email,
			createdAt: new Date(),
			role: "user",
		};
		await setDoc(userDocRef, userData);
		return userData;
	}

	return userDocSnap.data();
}

export async function logout() {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
}
