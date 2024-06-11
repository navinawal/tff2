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
import { setCookie, deleteCookie } from "cookies-next";

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
				const userData = await handleUser(authUser);
				setUser(userData);
				await setAuthCookie(authUser);
			} else {
				setUser(null);
				deleteCookie("token");
			}
		});
		return () => unsubscribe();
	}, []);

	const setAuthCookie = async (user) => {
		try {
			const token = await user.getIdToken();
			setCookie("token", token, { path: "/" });
		} catch (error) {
			throw error;
		}
	};

	const handleUser = async (user) => {
		const userDocRef = doc(db, "users", user.uid);
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

	const registerWithEmail = async (name, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				await updateProfile(user, {
					displayName: name,
				});
				const userData = await handleUser(userCredential.user);
				await sendEmailVerification(user);
				return { user, userData };
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
			const userData = await handleUser(userCredential.user);
			setUser(userData);
			await setAuthCookie(userCredential.user);
		} catch (error) {
			throw error;
		}
	};

	const loginWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, googleProvider);
			const userData = await handleUser(userCredential.user);
			setUser(userData);
			await setAuthCookie(userCredential.user);
		} catch (error) {
			throw error;
		}
	};

	const loginWithFacebook = async () => {
		try {
			const userCredential = await signInWithPopup(auth, facebookProvider);
			const userData = await handleUser(userCredential.user);
			setUser(userData);
			await setAuthCookie(userCredential.user);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			deleteCookie("token");
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
