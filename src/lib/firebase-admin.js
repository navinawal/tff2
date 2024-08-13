import dotenv from 'dotenv';
dotenv.config();
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from 'fs';

let serviceAccount;

try {
    // Try to read the service account key from the file
    const rawServiceAccount = fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    serviceAccount = JSON.parse(rawServiceAccount);
} catch (error) {
    console.error("Error reading service account file:", error);
    // If reading from file fails, construct the service account object from environment variables
    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
}

// Initialize the Firebase Admin SDK
let adminApp;
if (!getApps().length) {
    adminApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
} else {
    adminApp = getApp();
}

const firebaseAdmin = getAdminAuth(adminApp);
const adminDb = getFirestore(adminApp);

export { firebaseAdmin, adminDb, FieldValue };