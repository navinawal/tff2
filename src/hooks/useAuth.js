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
import { auth, googleProvider, facebookProvider } from "@/lib/firebase";
import { setAuthCookie, revokeAllSessions } from "@/app/actions/userAuth";
import { getUserProfile, createUserProfile, updateUserProfile } from "@/app/actions/users_profile";
import { getTeamMemberDetails } from "@/app/actions/team_members";
import { getCompanyProfile } from "@/app/actions/companies";

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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				const uid = authUser.uid;
				const authToken = await authUser.getIdToken();
				const profileData = await handleUserProfile(uid, authUser.photoURL, authUser.displayName);

				let teamMember;
				if (profileData && profileData.role === "TeamMember") {
					teamMember = await getTeamMemberDetails(uid);
				}

				let company;
				if (profileData && profileData.role === "Company") {
					company = await getCompanyProfile(uid);
				}

				await setAuthCookie(authToken);
				setUser({ uid, profileData, teamMember, company });
			} else {
				await logout();
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const handleUserProfile = async (uid, photoURL, displayName) => {
		try {
			let response = await getUserProfile(uid);

			if (!response.success) {
				const firstName = displayName?.split(" ")[0] || "";
				const lastName = displayName?.split(" ").slice(1).join(" ") || "";
				const profileData = {
					uid,
					email: auth.currentUser.email,
					profileImage: photoURL || "",
					firstName,
					lastName,
				};
				response = await createUserProfile(uid, profileData);
				if (!response.success) throw new Error(response.message);
				return profileData;
			} else {
				const profileData = response.data;
				const updatedFields = {};
				if (!profileData.profileImage && photoURL) {
					updatedFields.profileImage = photoURL;
				}
				if (!profileData.firstName && displayName) {
					updatedFields.firstName = displayName.split(" ")[0];
				}
				if (!profileData.lastName && displayName) {
					updatedFields.lastName = displayName.split(" ").slice(1).join(" ");
				}
				if (Object.keys(updatedFields).length > 0) {
					await updateUserProfile(uid, updatedFields);
				}
				return profileData;
			}
		} catch (error) {
			console.error("Error handling user profile:", error);
			throw error;
		}
	};

	const registerWithEmail = async (firstName, lastName, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				const uid = user.uid;
				const profileData = {
					//uid,
					firstName,
					lastName,
					email,
				};
				const response = await createUserProfile(uid, profileData);
				if (!response.success) throw new Error(response.message);
				await sendEmailVerification(user);
				return { user, profileData };
			} else {
				throw new Error("Error during registration.");
			}
		} catch (error) {
			console.error("Error registering user:", error);
			throw error;
		}
	};

	const forgotPassword = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			console.error("Error sending password reset email:", error);
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
			console.error("Error logging in with email:", error);
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
			console.error("Error logging in with Google:", error);
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
			console.error("Error logging in with Facebook:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			await revokeAllSessions();
		} catch (error) {
			console.error("Error logging out:", error);
			throw error;
		}
	};

	return {
		user,
		loading,
		registerWithEmail,
		forgotPassword,
		loginWithEmail,
		loginWithGoogle,
		loginWithFacebook,
		logout,
	};
}
