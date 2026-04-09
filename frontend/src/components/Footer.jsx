import React from 'react'
import "../components/Footer.css"
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-socials">
          <Link to="https://github.com/tkdenge" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/tkdenge/" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <FaLinkedin />
          </Link>
          <Link to="mailto:tkdenge3@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
            <CiMail />
          </Link>    
        </div>
        <hr />
        <p>© 2026 Thanyani Katleho Denge.</p>
      </div>
    </>
  )
}

export default Footer