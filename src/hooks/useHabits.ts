

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { subscribeToUserData, updateHabitStatus } from '@/lib/db';

export function useHabits() {
  const { user } = useAuth();
  const [habitData, setHabitData] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserData(user.uid, (data) => {
      if (data?.habitData) {
        setHabitData(data.habitData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleHabit = async (habitId: string, day: string, weekKey: string) => {
    if (!user) return;
    const key = `${weekKey}_${habitId}_${day}`;
    const newStatus = !habitData[key];
    try {
      await updateHabitStatus(user.uid, key, newStatus);
    } catch (error) {
      console.error('Failed to update habit:', error);
      throw error;
    }
  };

  return { habitData, toggleHabit, loading };
}
