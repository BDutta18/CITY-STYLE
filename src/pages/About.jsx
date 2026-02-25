import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/About.css';

const About = () => {
    return (
        <>
            <Navbar />
            <Breadcrumb />
            <main className="about-section">
                <div className="about-container">
                    <h1 className="about-title">About CITY STYLE</h1>
                    <p className="about-subtitle">
                        Redefining fashion with confidence, creativity, and modern trends.
                    </p>

                    {/* ABOUT GRID */}
                    <div className="about-grid">
                        <div className="about-card">
                            <i className="ri-store-2-line"></i>
                            <h3>Our Purpose</h3>
                            <p>
                                CITY STYLE was created to bring high-quality fashion to everyone.
                                We focus on simplicity, elegance, and modern trends to create
                                a seamless shopping experience.
                            </p>
                        </div>

                        <div className="about-card">
                            <i className="ri-shirt-line"></i>
                            <h3>Our Features</h3>
                            <p>
                                Responsive design, secure authentication, trending collections,
                                size guides, order tracking, promotions, and smooth checkout system.
                            </p>
                        </div>

                        <div className="about-card">
                            <i className="ri-eye-line"></i>
                            <h3>Our Vision</h3>
                            <p>
                                To inspire confidence and creativity by making the latest fashion
                                affordable, accessible, and enjoyable for everyone.
                            </p>
                        </div>

                        <div className="about-card">
                            <i className="ri-code-s-slash-line"></i>
                            <h3>Technology</h3>
                            <p>
                                Built with HTML, CSS, and JavaScript ensuring fast performance,
                                responsive layouts, and interactive UI elements.
                            </p>
                        </div>
                    </div>

                    {/* STATISTICS SECTION */}
                    <div className="stats-section">
                        <div className="stat-card">
                            <h2>10K+</h2>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-card">
                            <h2>500+</h2>
                            <p>Products Available</p>
                        </div>
                        <div className="stat-card">
                            <h2>25+</h2>
                            <p>Fashion Categories</p>
                        </div>
                        <div className="stat-card">
                            <h2>99%</h2>
                            <p>Customer Satisfaction</p>
                        </div>
                    </div>

                    {/* WHY CHOOSE US */}
                    <div className="why-section">
                        <h2>Why Choose CITY STYLE?</h2>
                        <div className="why-grid">
                            <div className="why-card">
                                <i className="ri-truck-line"></i>
                                <h4>Fast Delivery</h4>
                                <p>Quick and reliable shipping with real-time tracking updates.</p>
                            </div>
                            <div className="why-card">
                                <i className="ri-secure-payment-line"></i>
                                <h4>Secure Payments</h4>
                                <p>Safe and encrypted transactions to protect your information.</p>
                            </div>
                            <div className="why-card">
                                <i className="ri-refresh-line"></i>
                                <h4>Easy Returns</h4>
                                <p>Hassle-free return and exchange policy for your convenience.</p>
                            </div>
                            <div className="why-card">
                                <i className="ri-customer-service-2-line"></i>
                                <h4>24/7 Support</h4>
                                <p>Dedicated support team ready to help anytime.</p>
                            </div>
                        </div>
                    </div>

                    {/* TEAM SECTION */}
                    <div className="team-section">
                        <h2>Meet Our Team</h2>
                        <div className="team-grid">
                            <div className="team-card">
                                <h4>Project Leader</h4>
                                <p>Bodhisatwa Dutta</p>
                            </div>

                            <div className="team-card">
                                <h4>Developers</h4>
                                <p>Md Ashad</p>
                                <p>Sabrina Carpenter</p>
                            </div>

                            <div className="team-card">
                                <h4>Design & Content</h4>
                                <p>Team CITY STYLE</p>
                            </div>
                        </div>
                    </div>

                    {/* FUTURE GOALS */}
                    <div className="future-section">
                        <h2>Our Future Goals</h2>
                        <p>
                            We aim to expand globally, introduce sustainable fashion collections,
                            integrate AI-powered recommendations, and create a fashion community
                            platform where users can share styles and inspiration.
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
};

export default About;
