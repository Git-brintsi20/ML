

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { subscribeToUserData, addGrowthEntry as addEntryDB, deleteGrowthEntry as deleteEntryDB, GrowthEntry } from '@/lib/db';

export function useGrowthEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<GrowthEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserData(user.uid, (data) => {
      if (data?.entries) {
        setEntries(data.entries);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addEntry = async (entry: Omit<GrowthEntry, 'id'>) => {
    if (!user) return;
    try {
      await addEntryDB(user.uid, entry);
    } catch (error) {
      console.error('Failed to add entry:', error);
      throw error;
    }
  };

  const deleteEntry = async (entryId: string) => {
    if (!user) return;
    try {
      await deleteEntryDB(user.uid, entryId);
    } catch (error) {
      console.error('Failed to delete entry:', error);
      throw error;
    }
  };

  return { entries, addEntry, deleteEntry, loading };
}
