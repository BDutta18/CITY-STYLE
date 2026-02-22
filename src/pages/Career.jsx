import React from 'react';
import '../styles/index.css';
import '../styles/Career.css';
import Breadcrumb from '../components/Breadcrumb';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Career = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Fashion Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time"
    },
    {
      id: 3,
      title: "Social Media Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time"
    },
    {
      id: 4,
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Part-time"
    }
  ];

  return (
    <>
      <Navbar />
      <Breadcrumb />
      
      <div className="section__container career__container">
        <div className="career__hero">
          <div className="section__header">Join Our Team</div>
          <p className="career__subtitle">
            We are looking for passionate individuals to help us redefine urban fashion functionality.
            Be part of a team that celebrates style, sustainability, and innovation.
          </p>
        </div>

        <div className="career__values">
          <div className="values__grid">
            <div className="value__card">
              <i className="ri-lightbulb-flash-line"></i>
              <h3>Innovation</h3>
              <p>We believe in pushing boundaries and constantly evolving our designs and technology.</p>
            </div>
            <div className="value__card">
              <i className="ri-team-line"></i>
              <h3>Collaboration</h3>
              <p>Great ideas comes from diverse minds working together towards a common goal.</p>
            </div>
            <div className="value__card">
              <i className="ri-leaf-line"></i>
              <h3>Sustainability</h3>
              <p>We are committed to ethical manufacturing and sustainable fashion practices.</p>
            </div>
          </div>
        </div>

        <div className="positions__section">
          <div className="positions__header">
            <h2>Open Positions</h2>
            <p>Ready to make an impact? Check out our current openings.</p>
          </div>
          
          <div className="job__list">
            {jobs.map(job => (
              <div key={job.id} className="job__card">
                <div className="job__info">
                  <h4>{job.title}</h4>
                  <div className="job__meta">
                    <span><i className="ri-briefcase-line"></i> {job.department}</span>
                    <span><i className="ri-map-pin-line"></i> {job.location}</span>
                    <span><i className="ri-time-line"></i> {job.type}</span>
                  </div>
                </div>
                <button className="btn apply__btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Career;
