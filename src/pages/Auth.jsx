import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

/* ──────────────────────────────────────────────
   Firebase error codes → user-friendly messages
   ────────────────────────────────────────────── */
const AUTH_ERRORS = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

const getErrorMessage = (error) => {
  // If it's a known Firebase error, return friendly message
  if (AUTH_ERRORS[error.code]) {
      return AUTH_ERRORS[error.code];
  }
  // Otherwise return the backend/standard error message
  return error.message || 'Something went wrong. Please try again.';
};

/* ──────────────────────────────────────────────
   Auth Page Component
   ────────────────────────────────────────────── */
const Auth = () => {
  const navigate = useNavigate();
  const { user, register, login, loginWithGoogle, resetPassword } = useAuth();

  // If already logged in, redirect to profile
  if (user) {
    return <Navigate to="/shop" replace />;
  }

  /* ── Form State ────────────────────────────── */
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /* ── Forgot Password State ─────────────────── */
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  /* ── Helpers ────────────────────────────────── */
  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setShowPassword(false);
    setSuccessMessage('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearForm();
  };

  /* ── Form Validation ───────────────────────── */
  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }

    if (!password) {
      setError('Password is required.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    // Registration-specific checks
    if (!isLogin) {
      if (!fullName.trim()) {
        setError('Full name is required.');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return false;
      }
    }

    return true;
  };

  /* ── Submit Handler ────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/profile');
      } else {
        await register(fullName.trim(), email, password);
        // Show success message
        setSuccessMessage('Account created successfully! Switching to Login...');
        
        // Wait briefly to show the success message, then switch to login mode automatically
        setTimeout(() => {
          setSuccessMessage('');
          setIsLogin(true); // Switch to login form
          setPassword('');  // Clear sensitive fields
          setConfirmPassword('');
        }, 1500);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ── Google Sign-In Handler ────────────────── */
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ── Forgot Password Handler ───────────────── */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');

    if (!resetEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ── Forgot Password View ──────────────────── */
  if (showForgotPassword) {
    return (
      <div className="auth-wrapper">
        <Link to="/" className="auth-back-button" aria-label="Back to home">
          <i className="ri-arrow-left-line"></i>
          <span>Back to Home</span>
        </Link>

        <div className="glass-card">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form className="auth-form" onSubmit={handleForgotPassword}>
            <div className="input-group">
              <label htmlFor="reset-email">Email address</label>
              <input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                className="auth-input"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {resetMessage && <p className="success-message">{resetMessage}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="toggle-text">
            Remember your password?{' '}
            <span onClick={() => { setShowForgotPassword(false); setError(''); setResetMessage(''); }}>
              Back to Login
            </span>
          </p>
        </div>
      </div>
    );
  }

  /* ── Main Auth View ────────────────────────── */
  return (
    <div className="auth-wrapper">
      <Link to="/" className="auth-back-button" aria-label="Back to home">
        <i className="ri-arrow-left-line"></i>
        <span>Back to Home</span>
      </Link>

      <div className="glass-card">
        <h2 className="auth-title">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Full Name — register only */}
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="auth-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password — register only */}
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="auth-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}
          {/* Success Message */}
          {successMessage && <p className="success-message" style={{color: 'green', margin: '10px 0'}}>{successMessage}</p>}

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? (isLogin ? 'Logging in...' : 'Creating account...')
              : (isLogin ? 'Login' : 'Sign up')
            }
          </button>

          {/* Forgot Password — login only */}
          {isLogin && (
            <p
              className="forgot-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </p>
          )}
        </form>

        <div className="separator"></div>

        {/* Google Sign-In */}
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
        </button>

        {/* Toggle Login / Register */}
        <p className="toggle-text">
          {isLogin ? 'New to City Style?' : 'Already have an account?'}
          <span onClick={switchMode}>
            {isLogin ? ' Create here' : ' Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
