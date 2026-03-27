

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { subscribeToUserData, updateUserProfile, UserProfile } from '@/lib/db';

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Your Name',
    initials: 'ML',
    college: '',
    role: 'ML Learner',
    bio: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserData(user.uid, (data) => {
      if (data?.profile) {
        setProfile(data.profile);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, updates);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return { profile, updateProfile, loading };
}
