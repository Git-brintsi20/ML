import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, } from 'firebase/auth';
import { auth } from './firebase';
export async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
export async function signIn(email, password) {
    await setPersistence(auth, browserLocalPersistence);
    return signInWithEmailAndPassword(auth, email, password);
}
export async function logout() {
    return signOut(auth);
}
export function getCurrentUser() {
    return auth.currentUser;
}
