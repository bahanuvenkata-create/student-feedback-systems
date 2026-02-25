import { useCallback } from 'react';

const ACTIVITY_STORAGE_KEY = 'app_activities';

export const useActivity = () => {
  const addActivity = useCallback((action, details = '') => {
    const activities = JSON.parse(localStorage.getItem(ACTIVITY_STORAGE_KEY) || '[]');
    
    const newActivity = {
      id: Date.now(),
      action,
      details,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toLocaleString()
    };
    
    activities.unshift(newActivity);
    
    // Keep only last 50 activities
    if (activities.length > 50) {
      activities.pop();
    }
    
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
    
    return newActivity;
  }, []);

  const getActivities = useCallback(() => {
    return JSON.parse(localStorage.getItem(ACTIVITY_STORAGE_KEY) || '[]');
  }, []);

  const clearActivities = useCallback(() => {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify([]));
  }, []);

  return { addActivity, getActivities, clearActivities };
};
