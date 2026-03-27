import { doc, setDoc, getDoc, updateDoc, onSnapshot, serverTimestamp, } from 'firebase/firestore';
import { db } from './firebase';
const defaultProfile = {
    name: 'Your Name',
    initials: 'ML',
    college: '',
    role: 'ML Learner',
    bio: '',
};
const defaultPlatforms = {
    kaggle: '',
    github: '',
    hf: '',
    linkedin: '',
};
// Initialize user data in Firestore
export async function initializeUserData(uid, email) {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        const defaultData = {
            email,
            profile: defaultProfile,
            platforms: defaultPlatforms,
            tasksChecked: {},
            habitData: {},
            entries: [],
            lastUpdated: serverTimestamp(),
        };
        await setDoc(userRef, defaultData);
    }
}
// Update user profile
export async function updateUserProfile(uid, profile) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        profile: { ...defaultProfile, ...profile },
        lastUpdated: serverTimestamp(),
    });
}
// Update platforms
export async function updateUserPlatforms(uid, platforms) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        platforms: { ...defaultPlatforms, ...platforms },
        lastUpdated: serverTimestamp(),
    });
}
// Update task checked status
export async function updateTaskStatus(uid, taskId, checked) {
    const userRef = doc(db, 'users', uid);
    const tasksRef = { [`tasksChecked.${taskId}`]: checked };
    await updateDoc(userRef, {
        ...tasksRef,
        lastUpdated: serverTimestamp(),
    });
}
// Update habit status
export async function updateHabitStatus(uid, habitKey, value) {
    const userRef = doc(db, 'users', uid);
    const habitRef = { [`habitData.${habitKey}`]: value };
    await updateDoc(userRef, {
        ...habitRef,
        lastUpdated: serverTimestamp(),
    });
}
// Add growth entry
export async function addGrowthEntry(uid, entry) {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    const currentEntries = userDoc.data()?.entries || [];
    const newEntry = {
        ...entry,
        id: Date.now().toString(),
    };
    await updateDoc(userRef, {
        entries: [newEntry, ...currentEntries],
        lastUpdated: serverTimestamp(),
    });
    return newEntry;
}
// Delete growth entry
export async function deleteGrowthEntry(uid, entryId) {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    const entries = userDoc.data()?.entries || [];
    const filtered = entries.filter((e) => e.id !== entryId);
    await updateDoc(userRef, {
        entries: filtered,
        lastUpdated: serverTimestamp(),
    });
}
// Subscribe to user data changes
export function subscribeToUserData(uid, callback) {
    const userRef = doc(db, 'users', uid);
    return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
        else {
            callback(null);
        }
    });
}
