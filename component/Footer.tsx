import React from 'react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '../styles/Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles['bg-zinc-900 text-zinc-400 py-8']}>
        <div className={styles['footer-container']}>

    <div className={styles['footer-section']}>
      <h2>About Us</h2>
      <p>We provide high-quality digital solutions for your business. Reliability, innovation, and support are our priorities.</p>
    </div>

  
    <div className={styles['footer-section']}>
      <h2>Navigation</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Portfolio</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    
    <div className={styles['footer-section']}>
      <h2>Contact</h2>
      <p>Email: info@example.com</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Address: 123 Sample St, New York, NY</p>
    </div>

    
    <div className={styles['footer-section']}>
      <h2>Newsletter</h2>
      <form>
        <input type="email" placeholder="Your email"/>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>

  <div className={styles['footer-bottom']}>
    &copy; 2025 Example Company. All rights reserved.
  </div>
    </footer>
  );
};

export default Footer;