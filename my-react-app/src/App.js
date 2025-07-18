import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  // Simple parallax effect for background
  React.useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector('.home-bg');
      if (bg) {
        bg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <div className="home-bg"></div>
      <div className="home-content">
        <img className="profile-pic" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
        <h1 className="home-name">John Doe</h1>
        <div className="home-links">
          <a href="https://www.linkedin.com/in/alexander-saccone/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/alexsaccone" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="home-bio">I'm a computer science student passionate about building impactful software and learning new technologies. Welcome to my portfolio!</p>
      </div>
    </div>
  );
}

function Projects() {
  const projects = [
    {
      name: "Project Alpha",
      desc: "A cool project that does amazing things.",
      img: "https://via.placeholder.com/300x180?text=Project+Alpha"
    },
    {
      name: "Beta Builder",
      desc: "A builder tool for beta testing.",
      img: "https://via.placeholder.com/300x180?text=Beta+Builder"
    },
    {
      name: "Gamma Game",
      desc: "A fun game built with React.",
      img: "https://via.placeholder.com/300x180?text=Gamma+Game"
    }
  ];
  return (
    <div className="projects-container">
      {projects.map((proj, idx) => (
        <div className="project-card" key={idx}>
          <img src={proj.img} alt={proj.name} className="project-img" />
          <h3 className="project-title">{proj.name}</h3>
          <p className="project-desc">{proj.desc}</p>
        </div>
      ))}
    </div>
  );
}

function ContactPopup({ open, onClose }) {
  return (
    <>
      <div className={`contact-popup${open ? " open" : ""}`}> 
        <div className="contact-content">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Contact</h2>
          <p>Email: your.email@example.com</p>
        </div>
      </div>
      <div
        className="contact-popup-overlay"
        style={{ display: open ? 'block' : 'none' }}
        onClick={onClose}
      />
    </>
  );
}

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <Router>
      <div className="app-root">
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/" className="nav-logo">My Portfolio</Link>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
          </div>
          <button className="contact-btn" onClick={() => setContactOpen(true)}>Contact</button>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
