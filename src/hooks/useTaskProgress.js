'use client';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { subscribeToUserData, updateTaskStatus } from '@/app/lib/db';
export function useTaskProgress() {
    const { user } = useAuth();
    const [tasksChecked, setTasksChecked] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        const unsubscribe = subscribeToUserData(user.uid, (data) => {
            if (data?.tasksChecked) {
                setTasksChecked(data.tasksChecked);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);
    const toggleTaskStatus = async (taskId) => {
        if (!user)
            return;
        const newStatus = !tasksChecked[taskId];
        try {
            await updateTaskStatus(user.uid, taskId, newStatus);
        }
        catch (error) {
            console.error('Failed to update task:', error);
            throw error;
        }
    };
    return { tasksChecked, toggleTaskStatus, loading };
}
