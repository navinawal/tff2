import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
	projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
	clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const adminApp = !getApps().length
	? initializeApp({
			credential: cert(firebaseAdminConfig),
	  })
	: getApp();

const firebaseAdmin = getAdminAuth(adminApp);
const adminDb = getFirestore(adminApp);

export { firebaseAdmin, adminDb };
