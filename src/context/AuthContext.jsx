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

    /* Single listener — replaces the duplicate listeners
       that were scattered across Home, Profile, and ProductDetail */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* ── Auth Actions ─────────────────────────── */

    /**
     * Register a new user with email and password.
     * Automatically sets the display name so Profile works immediately.
     */
    const register = async (fullName, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: fullName });
        return result;
    };

    /**
     * Login with email and password.
     */
    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
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
        return await signOut(auth);
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
