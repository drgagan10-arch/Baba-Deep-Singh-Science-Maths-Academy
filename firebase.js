// firebase.js - Using Firestore instead of Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBicduGPEyQuYebOaJOdDD05V4C3j5NYwY",
    authDomain: "fir-coaching-centre.firebaseapp.com",
    projectId: "fir-coaching-centre",
    storageBucket: "fir-coaching-centre.firebasestorage.app",
    messagingSenderId: "961772672087",
    appId: "1:961772672087:web:005d2a5ea29163131eff12",
    measurementId: "G-KSD1CRD9QB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save query to Firestore
export async function saveQuery(name, phone, queryText) {
    if (!name || !phone || !queryText) throw new Error("All fields required");
    try {
        await addDoc(collection(db, "queries"), {
            name: name,
            phone: phone,
            message: queryText,
            timestamp: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Firestore error:", error);
        throw error;
    }
}

// Get all queries from Firestore
export async function getAllQueries() {
    try {
        const q = query(collection(db, "queries"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const queriesArray = [];
        querySnapshot.forEach((doc) => {
            queriesArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return queriesArray;
    } catch (error) {
        console.error("Error fetching queries:", error);
        return [];
    }
}