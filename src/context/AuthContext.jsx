import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    auth,
    googleProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    onAuthStateChanged,
} from '../firebase';

/* ──────────────────────────────────────────────
   Context & Hook
   ────────────────────────────────────────────── */
const AuthContext = createContext(null);

/**
 * Custom hook to consume auth state from any component.
 * Must be used inside <AuthProvider>.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/* ──────────────────────────────────────────────
   Provider
   ────────────────────────────────────────────── */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* Check for token in localStorage on mount */
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Update this to your deployed backend URL in production
                    const response = await fetch('http://localhost:3001/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem('token');
                }
            } else {
                // If no token in local storage, check Firebase (e.g. for Google Sign In users)
                // We need to wait for Firebase to initialize before setting loading=false
                await new Promise(resolve => {
                    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                        if (currentUser) {
                            setUser(currentUser);
                        }
                        unsubscribe(); // Unsubscribe immediately after first callback
                        resolve();
                    });
                });
                
                // Set up a permanent listener for auth state changes
                onAuthStateChanged(auth, (currentUser) => {
                     // Only update user state if we are not using our custom backend token
                     if (!localStorage.getItem('token')) {
                        setUser(currentUser);
                     }
                });
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    /* ── Auth Actions ─────────────────────────── */

    /**
     * Register a new user with email and password via Backend API.
     */
    const register = async (fullName, email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: fullName, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // DO NOT auto-login (store token) here if redirect to login is desired.
            // Just return success.
            return data;
        } catch (error) {
           throw error;
        }
    };

    /**
     * Login with email and password via Backend API.
     */
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Login with Google (existing Firebase flow).
     */
    const loginWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    /**
     * Logout the current user.
     */
    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        await signOut(auth);
    };

    /**
     * Send a password-reset email.
     */
    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    };

    /* ── Context Value ────────────────────────── */
    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
    };

    /* Show a simple spinner while Firebase resolves auth state.
       This prevents a flash of the login page on hard refresh. */
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#000',
            }}>
                <div style={{
                    width: 40,
                    height: 40,
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#e5d241',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
