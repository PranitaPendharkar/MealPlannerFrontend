import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  
  return (
    <>
     <footer>
        <ul className="icons">
            <li><Link to={'https://www.whatsapp.com/'}><i className="fa-brands fa-whatsapp fa-bounce" style={{color: "#25D366"}}></i></Link></li>
            <li><Link to={"https://www.linkedin.com/"}><i className="fa-brands fa-linkedin fa-bounce" style={{color: "#0072b1"}}></i></Link></li>
            <li><Link to={'https://www.facebook.com/'}><i className="fa-brands fa-facebook fa-bounce" style={{color: "#1877F2"}}></i></Link></li>
            <li><Link to={"https://www.instagram.com/"}><i className="fa-brands fa-instagram fa-bounce" style={{color: "#feda75"}}></i></Link></li>
        </ul>
        <ul className="menu">
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/">About</Link></li>
                <li> <Link to="/all-recipies">Meals</Link></li>
                <li> <Link to="/">Contact Us</Link></li>
              
        </ul>
            <div className="footer-copyright">
                <p>Copyright @ 2023 All Rights Reserved.</p>
            </div>
    </footer>
    </>
  );
}

export default Footer;
