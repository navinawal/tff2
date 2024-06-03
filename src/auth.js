import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "@/lib/firestore";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: FirestoreAdapter(firestore),
	...authConfig,
});
