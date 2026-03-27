'use client';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { subscribeToUserData, updateUserPlatforms } from '@/app/lib/db';
export function usePlatforms() {
    const { user } = useAuth();
    const [platforms, setPlatforms] = useState({
        kaggle: '',
        github: '',
        hf: '',
        linkedin: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const unsubscribe = subscribeToUserData(user.uid, (data) => {
            if (data?.platforms) {
                setPlatforms(data.platforms);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);
    const updatePlatforms = async (updates) => {
        if (!user)
            return;
        try {
            await updateUserPlatforms(user.uid, updates);
        }
        catch (error) {
            console.error('Failed to update platforms:', error);
            throw error;
        }
    };
    return { platforms, updatePlatforms, loading };
}
