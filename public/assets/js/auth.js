import { auth, database } from './firebase-app.js';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, set, get } from "firebase/database";

const authBtn = document.getElementById('auth-btn');

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const login = async (providerName) => {
    let provider;
    if (providerName === 'google') provider = googleProvider;
    else if (providerName === 'github') provider = githubProvider;

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Logged in as:", user.displayName);
        
        // Save user to database
        await saveUserToDB(user);
    } catch (error) {
        console.error("Auth error:", error);
    }
};

export const logout = () => signOut(auth);

const saveUserToDB = async (user) => {
    const userRef = ref(database, 'users/' + user.uid);
    await set(userRef, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: new Date().toISOString()
    });
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        authBtn.textContent = 'Logout';
        authBtn.onclick = logout;
    } else {
        authBtn.textContent = 'Login';
        authBtn.onclick = () => {
            // Default to Google for now, can add a modal later
            login('google');
        };
    }
});
