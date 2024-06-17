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
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, facebookProvider } from "@/lib/firebase";
import { deleteCookie } from "cookies-next";
import { setAuthCookie, revokeAllSessions } from "@/app/actions/userAuth";

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
				const uid = authUser.uid;
				const authToken = await authUser.getIdToken();
				const profileData = await handleUserProfile(uid, authUser.photoURL, authUser.displayName);
				await setAuthCookie(authToken);
				setUser({ uid, profileData });
			} else {
				await logout();
			}
		});
		return () => unsubscribe();
	}, []);

	const handleUserProfile = async (uid, photoURL, displayName) => {
		const profileDocRef = doc(db, "users_profile", uid);
		const profileDoc = await getDoc(profileDocRef);

		let firstName = "",
			lastName = "";
		if (displayName) {
			[firstName, ...lastName] = displayName.split(" ");
			lastName = lastName.join("");
		}

		if (!profileDoc.exists()) {
			const profileDocData = {
				email: auth.currentUser.email,
				createdAt: new Date(),
				profileImage: photoURL || "",
				firstName: firstName || "",
				lastName: lastName || "",
			};
			await setDoc(profileDocRef, profileDocData);
			return profileDocData;
		} else {
			const existingProfileData = profileDoc.data();
			const updatedFields = {};
			if (!existingProfileData.profileImage && photoURL) {
				updatedFields.profileImage = photoURL;
			}
			if (!existingProfileData.firstName && firstName) {
				updatedFields.firstName = firstName;
			}
			if (!existingProfileData.lastName && lastName) {
				updatedFields.lastName = lastName;
			}
			if (Object.keys(updatedFields).length > 0) {
				await setDoc(profileDocRef, updatedFields, { merge: true });
			}
			return existingProfileData;
		}
	};

	const registerWithEmail = async (firstName, lastName, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				const uid = user.uid;
				const profileData = {
					firstName,
					lastName,
					email,
					createdAt: new Date(),
				};
				await setDoc(doc(db, "users_profile", uid), profileData);
				await sendEmailVerification(user);
				// setUser({ uid, profileData });
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
			const user = userCredential.user;
			const uid = user.uid;
			const authToken = await user.getIdToken();
			const profileData = await handleUserProfile(uid);
			await setAuthCookie(authToken);
			setUser({ uid, profileData });
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
			const profileData = await handleUserProfile(uid, user.photoURL, user.displayName);
			await setAuthCookie(authToken);
			setUser({ uid, profileData });
		} catch (error) {
			throw error;
		}
	};

	const loginWithFacebook = async () => {
		try {
			const userCredential = await signInWithPopup(auth, facebookProvider);
			const user = userCredential.user;
			const uid = user.uid;
			const authToken = await user.getIdToken();
			const profileData = await handleUserProfile(uid, user.photoURL, user.displayName);
			await setAuthCookie(authToken);
			setUser({ uid, profileData });
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			deleteCookie("authToken");
			await revokeAllSessions();
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
