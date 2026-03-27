import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';

export interface UserProfile {
  name: string;
  initials: string;
  college: string;
  role: string;
  bio: string;
}

export interface UserPlatforms {
  kaggle: string;
  github: string;
  hf: string;
  linkedin: string;
}

export interface GrowthEntry {
  id: string;
  title: string;
  body: string;
  tags: string[];
  type: 'learning' | 'build' | 'internship' | 'win' | 'blocker';
  date: string;
  createdAt: number;
}

interface UserData {
  email: string;
  profile: UserProfile;
  platforms: UserPlatforms;
  tasksChecked: Record<string, boolean>;
  habitData: Record<string, boolean>;
  entries: GrowthEntry[];
  lastUpdated: any;
}

const defaultProfile: UserProfile = {
  name: 'Your Name',
  initials: 'ML',
  college: '',
  role: 'ML Learner',
  bio: '',
};

const defaultPlatforms: UserPlatforms = {
  kaggle: '',
  github: '',
  hf: '',
  linkedin: '',
};

// Initialize user data in Firestore
export async function initializeUserData(uid: string, email: string) {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const defaultData: UserData = {
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
export async function updateUserProfile(uid: string, profile: Partial<UserProfile>) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    profile: { ...defaultProfile, ...profile },
    lastUpdated: serverTimestamp(),
  });
}

// Update platforms
export async function updateUserPlatforms(uid: string, platforms: Partial<UserPlatforms>) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    platforms: { ...defaultPlatforms, ...platforms },
    lastUpdated: serverTimestamp(),
  });
}

// Update task checked status
export async function updateTaskStatus(uid: string, taskId: string, checked: boolean) {
  const userRef = doc(db, 'users', uid);
  const tasksRef = { [`tasksChecked.${taskId}`]: checked };
  await updateDoc(userRef, {
    ...tasksRef,
    lastUpdated: serverTimestamp(),
  });
}

// Update habit status
export async function updateHabitStatus(uid: string, habitKey: string, value: boolean) {
  const userRef = doc(db, 'users', uid);
  const habitRef = { [`habitData.${habitKey}`]: value };
  await updateDoc(userRef, {
    ...habitRef,
    lastUpdated: serverTimestamp(),
  });
}

// Add growth entry
export async function addGrowthEntry(uid: string, entry: Omit<GrowthEntry, 'id'>) {
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
export async function deleteGrowthEntry(uid: string, entryId: string) {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  const entries = userDoc.data()?.entries || [];
  const filtered = entries.filter((e: GrowthEntry) => e.id !== entryId);

  await updateDoc(userRef, {
    entries: filtered,
    lastUpdated: serverTimestamp(),
  });
}

// Subscribe to user data changes
export function subscribeToUserData(uid: string, callback: (data: UserData | null) => void) {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as UserData);
    } else {
      callback(null);
    }
  });
}
