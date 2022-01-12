import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig  = {
    // Your firebase configuration
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const db = getFirestore();