import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <>
            <Navbar />
            <Breadcrumb />
            <section className="section__container contact-section">
                <h2 className="section__header">Contact Us</h2>
                
                <div className="contact-content">
                    {/* Contact Info Side */}
                    <div className="contact-info">
                        <div className="contact-intro">
                            <p>Have questions about our latest collection, your order, or just want to say hello? We'd love to hear from you. Fill out the form or reach us through the details below.</p>
                        </div>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="ri-map-pin-line"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Our Office</h3>
                                    <p>123 Fashion Street, Soho</p>
                                    <p>New York, NY 10012, USA</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="ri-mail-line"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Email Us</h3>
                                    <p><a href="mailto:support@citystyle.com">support@citystyle.com</a></p>
                                    <p><a href="mailto:careers@citystyle.com">careers@citystyle.com</a></p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="ri-phone-line"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Call Us</h3>
                                    <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                                    <p>Mon - Fri, 9am - 6pm EST</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>Follow Us</h3>
                            <div className="social-icons-container">
                                <a href="#" className="social-icon" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
                                <a href="#" className="social-icon" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                                <a href="#" className="social-icon" aria-label="Twitter"><i className="ri-twitter-x-line"></i></a>
                                <a href="#" className="social-icon" aria-label="Pinterest"><i className="ri-pinterest-line"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="contact-form-container">
                        <h2>Send us a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    value={formData.subject} 
                                    onChange={handleChange} 
                                    placeholder="What is this regarding?" 
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Type your message here..." 
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn contact-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
