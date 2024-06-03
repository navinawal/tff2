import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { LoginSchema } from "@/schemas/Schemas";
import { signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
// import { firestore } from "@/lib/firestore";

const authConfig = {
	providers: [
		Credentials({
			credentials: {},
			authorize: async (credentials) => {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					try {
						const userCredential = await signInWithEmailAndPassword(auth, email, password);
						const user = userCredential.user;

						if (user) {
							return { id: user.uid, email: user.email };
						}
					} catch (e) {
						const errorMessage = e.response.data.message;
						// Redirecting to the login page with error message          in the URL
						throw new Error(errorMessage + "&email=" + credentials.email);
					}
				}

				return null;
			},
		}),
		GitHub,
		Google,
		Facebook,
	],
	session: { strategy: "jwt" },
	pages: {
		signIn: "/login",
	},
	// callbacks: {
	// 	async signIn(user, account, profile) {
	// 		if (account.provider === "google") {
	// 			// Sign in or create user in Firebase Auth
	// 			const credential = firebase.auth.GoogleAuthProvider.credential(account.idToken);
	// 			await signInWithCredential(credential);
	// 		}

	// 		return true;
	// 	},
	// 	async session(session, token) {
	// 		// Here you can pass the Firebase UID to the session object
	// 		session.user.uid = token.sub;
	// 		return session;
	// 	},
	// },
};

export default authConfig;
