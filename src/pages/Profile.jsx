import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../firebase';
import '../styles/Profile.css';
import Breadcrumb from '../components/Breadcrumb';
import LazyImage from '../components/LazyImage';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  /* ── Form Data ─────────────────────────────── */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '+91 0000000000',
    gender: 'Male',
  });

  /* Populate form fields from the auth user */
  useEffect(() => {
    if (user) {
      const nameParts = user.displayName
        ? user.displayName.split(' ')
        : ['User', ''];

      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' '),
        email: user.email,
      }));
    }
  }, [user]);

  /* ── Handlers ──────────────────────────────── */
  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home page after logout
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Save profile changes to Firebase.
   * Updates the user's displayName so it persists across sessions.
   */
  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const newDisplayName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateProfile(user, { displayName: newDisplayName });

      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to update profile. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  /* ── Determine auth provider ───────────────── */
  const isGoogleUser =
    user?.providerData?.[0]?.providerId === 'google.com';

  return (
    <div className="profile-root">
      {/* NAVBAR */}
      <nav className="glass-nav">
        <div className="nav__logo">
          <Link to="/">CITY STYLE</Link>
        </div>
        <ul className="nav__links_desktop">
          <li><Link to="/#catalogue">CATALOGUE</Link></li>
          <li><Link to="/#fashion">FASHION</Link></li>
          <li><Link to="/#favourite">FAVOURITE</Link></li>
          <li><Link to="/#lifestyle">LIFESTYLE</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-btn-nav logout-desktop">
          LOGOUT
        </button>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>
      <ul className={`mobile-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/#catalogue" onClick={closeMobileMenu}>CATALOGUE</Link></li>
        <li><Link to="/#fashion" onClick={closeMobileMenu}>FASHION</Link></li>
        <li><Link to="/#favourite" onClick={closeMobileMenu}>FAVOURITE</Link></li>
        <li><Link to="/#lifestyle" onClick={closeMobileMenu}>LIFESTYLE</Link></li>
        <li className="mobile-logout-item">
          <button onClick={handleLogout} className="mobile-logout-btn">LOGOUT</button>
        </li>
      </ul>

      <Breadcrumb />

      <div className="profile-content-grid">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="user-brief-card">
            <div className="avatar-holder">
              <LazyImage
                src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                alt="Profile"
                width={50}
                height={50}
                aspectRatio="1 / 1"
                objectFit="cover"
                wrapperStyle={{ borderRadius: '50%' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="brief-info">
              <span className="greeting">Welcome,</span>
              <h4 className="full-name">{user?.displayName || 'User'}</h4>
            </div>
          </div>

          <div className="navigation-menu">
            {/* Orders Section */}
            <div className="menu-group">
              <div className="menu-header">
                <i className="ri-shopping-bag-line"></i> MY ORDERS
              </div>
              <ul className="sub-navigation">
                <li onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
                  Order History
                </li>
                <li onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
                  In Cart
                </li>
                <li className="coming-soon-item">
                  Returns <span className="coming-soon-badge">Coming Soon</span>
                </li>
              </ul>
            </div>

            {/* Account Settings */}
            <div className="menu-group active">
              <div className="menu-header">
                <i className="ri-user-line"></i> ACCOUNT SETTINGS
              </div>
              <ul className="sub-navigation">
                <li className="active-link">Profile Information</li>
                <li className="coming-soon-item">
                  Manage Addresses <span className="coming-soon-badge">Coming Soon</span>
                </li>
              </ul>
            </div>

            {/* Logout */}
            <div className="menu-group logout-trigger" onClick={handleLogout}>
              <div className="menu-header danger">
                <i className="ri-logout-circle-r-line"></i> Logout
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN FORM AREA */}
        <main className="profile-form-area">
          {/* Save Message */}
          {saveMessage && (
            <div className={`profile-message ${saveMessage.includes('Failed') ? 'error' : 'success'}`}>
              {saveMessage}
            </div>
          )}

          <div className="form-card">
            <div className="card-top">
              <h3>Personal Information</h3>
              <button className="edit-toggle-btn" onClick={handleSave}>
                {isEditing ? 'SAVE CHANGES' : 'EDIT'}
              </button>
            </div>

            <div className="input-grid">
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="gender-section">
              <p className="field-title">Your Gender</p>
              <div className="radio-controls">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                  <span>Male</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3>Email Address</h3>
            <div className="input-field mt-20">
              <input
                type="email"
                value={formData.email}
                disabled
                className="locked-input"
              />
              <p className="form-hint">
                Managed via {isGoogleUser ? 'Google' : 'Email'} Authentication.
              </p>
            </div>
          </div>

          <div className="form-card">
            <h3>Mobile Number</h3>
            <div className="input-field mt-20">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                disabled={!isEditing}
                onChange={handleInputChange}
                className="locked-input"
              />
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="profile-footer">
        <div className="footer-container">
          <div className="footer__col">
            <div className="footer__logo">CITY STYLE</div>
            <p>Complete your style with awesome clothes from us.</p>
            <ul className="footer__socials">
              <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
              <li><a href="#"><i className="ri-instagram-line"></i></a></li>
              <li><a href="#"><i className="ri-twitter-fill"></i></a></li>
              <li><a href="#"><i className="ri-linkedin-fill"></i></a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul className="footer__links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/career">Careers</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/store-location">Store Location</Link></li>
              <li><Link to="/order-tracking">Order Tracking</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <ul className="footer__links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © Bodhisatwa Dutta {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Profile;
