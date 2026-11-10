import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyPlaceholderKeyForSparkFreeTier',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rahat-me.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rahat-me',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'rahat-me.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:00000000000000',
};

// Check if actual configuration has been provided
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key_here'
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('[Firebase] Initialization error, falling back to local seed data:', error);
  }
}

export { app, auth, db };
