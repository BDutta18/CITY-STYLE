import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '+91 0000000000',
    gender: 'Male'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const nameParts = currentUser.displayName ? currentUser.displayName.split(' ') : ['User', ''];
        setFormData(prev => ({
          ...prev,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' '),
          email: currentUser.email,
        }));
      } else {
        navigate('/auth');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-root">
      {/* PROFESSIONAL NAVBAR */}
      <nav className="glass-nav">
        <div className="nav__logo"><Link to="/">CITY STYLE</Link></div>
        <ul className="nav__links_desktop">
          <li><Link to="/#catalogue">CATALOGUE</Link></li>
          <li><Link to="/#fashion">FASHION</Link></li>
          <li><Link to="/#favourite">FAVOURITE</Link></li>
          <li><Link to="/#lifestyle">LIFESTYLE</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-btn-nav">LOGOUT</button>
      </nav>

      <div className="profile-content-grid">
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="user-brief-card">
            <div className="avatar-holder">
              <img 
                src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                alt="Profile" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="brief-info">
              <span className="greeting">Welcome,</span>
              <h4 className="full-name">{user?.displayName || "User"}</h4>
            </div>
          </div>

          <div className="navigation-menu">
            <div className="menu-group">
              <div className="menu-header"><i className="ri-shopping-bag-line"></i> MY ORDERS</div>
            </div>

            <div className="menu-group active">
              <div className="menu-header"><i className="ri-user-line"></i> ACCOUNT SETTINGS</div>
              <ul className="sub-navigation">
                <li className="active-link">Profile Information</li>
                <li>Manage Addresses</li>
                {}
              </ul>
            </div>

            {}

            <div className="menu-group logout-trigger" onClick={handleLogout}>
              <div className="menu-header danger"><i className="ri-logout-circle-r-line"></i> Logout</div>
            </div>
          </div>
        </aside>

        {/* MAIN FORM AREA */}
        <main className="profile-form-area">
          <div className="form-card">
            <div className="card-top">
              <h3>Personal Information</h3>
              <button className="edit-toggle-btn" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "SAVE CHANGES" : "EDIT"}
              </button>
            </div>

            <div className="input-grid">
              <div className="input-field">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} disabled={!isEditing} onChange={handleInputChange} />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} disabled={!isEditing} onChange={handleInputChange} />
              </div>
            </div>

            <div className="gender-section">
              <p className="field-title">Your Gender</p>
              <div className="radio-controls">
                <label className="radio-label">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} disabled={!isEditing} onChange={handleInputChange} />
                  <span>Male</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} disabled={!isEditing} onChange={handleInputChange} />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3>Email Address</h3>
            <div className="input-field mt-20">
              <input type="email" value={formData.email} disabled className="locked-input" />
              <p className="form-hint">Managed via Google Authentication.</p>
            </div>
          </div>

          <div className="form-card">
            <h3>Mobile Number</h3>
            <div className="input-field mt-20">
              <input type="text" name="mobile" value={formData.mobile} disabled={!isEditing} onChange={handleInputChange} className="locked-input" />
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
          Copyright © Bodhisatwa Dutta 2026. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Profile;