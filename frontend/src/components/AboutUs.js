import React, { memo } from 'react';
import './AboutUs.css';

const AboutUs = memo(() => {
  return (
    <div className="aboutus-container" role="main" aria-label="About Us main content">
      <h1>About Us</h1>
      <p>Welcome to GenuIQ, your ultimate destination for interview preparation. Our platform is designed to help you excel in your interviews by providing a comprehensive range of resources, including coding practice, resume building, MCQs, face-to-face interview tips, and company reviews.</p>
      <p>Our mission is to empower job seekers with the knowledge and skills needed to succeed in their interviews. We strive to provide high-quality content and tools that are easy to use and effective in helping you land your dream job.</p>
      <p>Whether you're a recent graduate or an experienced professional, GenuIQ has something to offer you. Explore our platform and discover the tools and resources that can help you achieve your career goals.</p>
      {/* Example image usage: */}
      {/* <img src="../images/logo.svg" alt="About Us Logo" loading="lazy" /> */}
    </div>
  );
});

export default AboutUs;
