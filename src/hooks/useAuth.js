"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, facebookProvider } from "@/lib/firebase";
import { deleteCookie } from "cookies-next";
import { revokeAllSessions, setAuthCookie } from "@/app/actions/userAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				const authToken = await authUser.getIdToken();
				const userData = await handleUser(authUser);
				await setAuthCookie(authToken);
				setUser(authUser);
			} else {
				setUser(null);
				deleteCookie("authToken");
			}
		});
		return () => unsubscribe();
	}, []);

	const handleUser = async (user) => {
		const userDocRef = doc(db, "users_profile", user.uid);
		const userDoc = await getDoc(userDocRef);

		if (!userDoc.exists()) {
			const userDocData = {
				uid: user.uid,
				email: user.email,
				createdAt: new Date(),
			};
			await setDoc(userDocRef, userDocData);
			return userDocData;
		} else {
			return userDoc.data();
		}
	};

	const handleUserProfile = async (uid) => {
		const profileDocRef = doc(db, "users_profile", uid);
		const profileDoc = await getDoc(profileDocRef);

		if (!profileDoc.exists()) {
			const profileDocData = {
				uid: user.uid,
				email: user.email,
				createdAt: new Date(),
			};
			await setDoc(profileDocRef, profileDocData);
			return profileDocData;
		} else {
			return profileDoc.data();
		}
	};

	const registerWithEmail = async (firstName, lastName, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential?.user;
			if (user) {
				const uid = userCredential?.user?.uid;
				const profileData = await handleUserProfile(uid, firstName, lastName);
				await sendEmailVerification(user);
				return { user, profileData };
			} else {
				throw new Error("Error while registration");
			}
		} catch (error) {
			throw error;
		}
	};

	const forgotPassword = async (email) => {
		try {
			const response = await sendPasswordResetEmail(auth, email);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const loginWithEmail = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential?.user;
			const uid = user?.uid;
			const authToken = await user?.getIdToken();
			const profileData = await handleUserProfile(uid);
			await setAuthCookie(authToken);
			setUser(userCredential);
			console.log(profileData);
		} catch (error) {
			throw error;
		}
	};

	const loginWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, googleProvider);
			const user = userCredential.user;
			const uid = user.uid;
			const authToken = await user.getIdToken();
			await setAuthCookie(authToken);
			const profileData = await handleUserProfile(uid);
			// /setUser(userCredential);
		} catch (error) {
			throw error;
		}
	};

	const loginWithFacebook = async () => {
		try {
			const userCredential = await signInWithPopup(auth, facebookProvider);
			const user = userCredential.user;
			const authToken = await user.getIdToken();
			const userData = await handleUser(userCredential.user);
			await setAuthCookie(authToken);
			setUser(userCredential);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			deleteCookie("authToken");
			revokeAllSessions();
		} catch (error) {
			throw error;
		}
	};

	return {
		user,
		registerWithEmail,
		forgotPassword,
		loginWithEmail,
		loginWithGoogle,
		loginWithFacebook,
		logout,
	};
}
