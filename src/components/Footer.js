import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub ,faSnapchat} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-header">Developed by Nikhil Raj </h2>
        <div className="social-links">
          <a href="https://www.instagram.com/nikhil_rajput011/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon size="2x" icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/in/nikhil-raj-18365a226/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon  size="2x" icon={faLinkedin} />
          </a>
          <a href="https://github.com/nikhil0235" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon size="2x" icon={faGithub}  />
          </a>
          <a href="https://nikhil-rajput01.netlify.app/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon size="2x" icon={faSnapchat}  />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
