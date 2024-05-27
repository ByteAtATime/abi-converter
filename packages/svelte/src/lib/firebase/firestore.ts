import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {env} from "$env/dynamic/private";

export const getFirestoreConnector = () => {
  // Not sure if this is the best way to do this
  // But if not, the app gives an error that the app has already been initialized.
  if (getApps().length > 0) {
    return getFirestore();
  }

  if (env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("Initializing LIVE Firestore with GOOGLE_APPLICATION_CREDENTIALS");
    initializeApp({
      credential: applicationDefault(),
    });
  } else if (env.FIREBASE_PRIVATE_KEY) {
    console.log("Initializing LIVE Firestore with FIREBASE_PRIVATE_KEY");
    initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } else {
    console.log("Initializing local Firestore instance");
    initializeApp({
      projectId: env.FIREBASE_PROJECT_ID,
    });
  }

  return getFirestore();
};
