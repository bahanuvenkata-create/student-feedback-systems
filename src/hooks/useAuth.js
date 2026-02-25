import { useCallback, useEffect, useState } from 'react';

const USERS_STORAGE_KEY = 'app_users';
const CURRENT_USER_STORAGE_KEY = 'app_current_user';

// Initialize demo users if none exist
const initializeDemoUsers = () => {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        name: 'John Student',
        email: 'student@demo.com',
        password: 'password123',
        role: 'student'
      },
      {
        id: '2',
        name: 'Admin User',
        email: 'admin@demo.com',
        password: 'password123',
        role: 'admin'
      }
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(demoUsers));
  }
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    initializeDemoUsers();
    const savedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = useCallback((name, email, password, role) => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim() || !role) {
      return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Get existing users
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY) || '[]';
    const users = JSON.parse(usersJson);

    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // In real app, this would be hashed
      role: role.toLowerCase()
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return { success: true, message: 'Account created successfully' };
  }, []);

  const login = useCallback((email, password) => {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Email and password are required' };
    }

    const usersJson = localStorage.getItem(USERS_STORAGE_KEY) || '[]';
    const users = JSON.parse(usersJson);

    const user = users.find(
      u => u.email === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Remove password from stored user
    const userToStore = { ...user };
    delete userToStore.password;

    setCurrentUser(userToStore);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(userToStore));

    return { success: true, user: userToStore };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }, []);

  const isAuthenticated = !!currentUser;
  const userRole = currentUser?.role;

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    userRole,
    signup,
    login,
    logout
  };
};
