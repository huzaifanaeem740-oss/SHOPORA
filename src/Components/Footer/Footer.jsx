import React from 'react';
import './Footer.css';

import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintrest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">

      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPORA</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">

        <div
          className="footer-icons-container"
          onClick={() =>
            window.open("https://www.instagram.com/faraz_qureshi_5/", "_blank")
          }
          style={{ cursor: "pointer" }}
        >
          <img src={instagram_icon} alt="Instagram" />
        </div>

        <div
          className="footer-icons-container"
          onClick={() =>
            window.open("https://www.pinterest.com/huzaifanaeem740/", "_blank")
          }
          style={{ cursor: "pointer" }}
        >
          <img src={pintrest_icon} alt="Pinterest" />
        </div>

        <div
          className="footer-icons-container"
          onClick={() =>
            window.open("https://wa.me/923282134905", "_blank")
          }
          style={{ cursor: "pointer" }}
        >
          <img src={whatsapp_icon} alt="WhatsApp" />
        </div>

      </div>

      <div className="footer-copyright">
        <hr />
        <div className="footer-bottom">
          <p>Copyright © 2026 | All Rights Reserved | Designed by Faraz Qureshi</p>
        </div>
      </div>

    </div>
  );
};

export default Footer;