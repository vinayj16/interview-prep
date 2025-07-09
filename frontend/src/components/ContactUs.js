import React, { memo } from 'react';
import './ContactUs.css';

const ContactUs = memo(() => {
  return (
    <div className="contactus-container" role="main" aria-label="Contact Us main content">
      <h1>Contact Us</h1>
      <p>Have questions or need assistance? We're here to help. You can reach us through the following channels:</p>
      <ul>
        <li>Email: contact@genuiq.com</li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Address: 1234 Elm Street, Suite 567, Somewhere, USA</li>
      </ul>
      <p>We value your feedback and are always looking for ways to improve our services. Don't hesitate to get in touch with us.</p>
    </div>
  );
});

export default ContactUs;
