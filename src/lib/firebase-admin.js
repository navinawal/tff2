import { initializeApp, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
	projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
	clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const firebaseAdmin = initializeApp({
	credential: cert(firebaseAdminConfig),
});

export { firebaseAdmin };
