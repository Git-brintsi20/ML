'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { initializeUserData } from '@/app/lib/db';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                setUser(currentUser);
                if (currentUser) {
                    await initializeUserData(currentUser.uid, currentUser.email || '');
                }
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
            finally {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);
    return value = {};
    {
        user, loading, error;
    }
}
 >
    { children }
    < /AuthContext.Provider>;
;
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
