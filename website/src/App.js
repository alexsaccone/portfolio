import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img className="home-bg" src="/my_mountains.jpg" alt="Background" />
        <div className="home-content">
          <img className="profile-pic" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
          <h1 className="home-name">Alexander Saccone</h1>
          <div className="home-links">
            <a href="https://www.linkedin.com/in/alexander-saccone/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/alexsaccone" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
      <div className="bio-background">
        <div className="home-bio-section">
          placeholder bio
        </div>
      </div>
    </div>
  );
}

function ProjectPopup({ open, onClose, project }) {
  return (
    <>
      <div className={`contact-popup${open ? " open" : ""}`}> 
        <div className="contact-content">
          <button className="close-btn" onClick={onClose}>×</button>
          {project && (
            <>
              <h2>{project.name}</h2>
              <img src={project.img2} alt={project.name + ' 2'} style={{width: '100%', borderRadius: '10px', margin: '1rem 0'}} />
              <p style={{color: '#bdbdbd'}}>{project.longDesc}</p>
            </>
          )}
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

function Projects({ openPopup, closePopup, popupOpen, selectedProject }) {
  const projects = [
    {
      name: "Project Alpha",
      img: "https://via.placeholder.com/300x180?text=Project+Alpha",
      img2: "https://via.placeholder.com/400x220?text=Alpha+Screenshot+2",
      shortDesc: "A cool project that does amazing things.",
      longDesc: "Project Alpha is a demonstration of advanced algorithms and modern UI. It features a robust backend and a beautiful frontend, making it a great showcase for my skills."
    },
    {
      name: "Beta Builder",
      img: "https://via.placeholder.com/300x180?text=Beta+Builder",
      img2: "https://via.placeholder.com/400x220?text=Beta+Builder+Extra",
      shortDesc: "A builder tool for beta testing.",
      longDesc: "Beta Builder streamlines the process of beta testing for developers. It includes automated feedback collection and analytics, all in a user-friendly package."
    },
    {
      name: "Gamma Game",
      img: "https://via.placeholder.com/300x180?text=Gamma+Game",
      img2: "https://via.placeholder.com/400x220?text=Gamma+Game+Level+2",
      shortDesc: "A fun game built with React.",
      longDesc: "Gamma Game is a fast-paced, addictive game built with React. It features multiple levels, smooth animations, and a high score system."
    }
  ];

  return (
    <div className="projects-container">
      {projects.map((proj, idx) => (
        <div className="project-card" key={idx} onClick={() => openPopup(proj)}>
          <img src={proj.img} alt={proj.name} className="project-img" />
          <h3 className="project-title">{proj.name}</h3>
          <p className="project-desc">{proj.shortDesc}</p>
        </div>
      ))}
      <ProjectPopup open={popupOpen} onClose={closePopup} project={selectedProject} />
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
          <p>Email: saccone.alexander.c@gmail.com</p>
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
  const [contactOpen, setContactOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);

  // Escape key closes popups
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (contactOpen) setContactOpen(false);
        if (popupOpen) {
          setPopupOpen(false);
          setSelectedProject(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contactOpen, popupOpen]);

  const openPopup = (project) => {
    setSelectedProject(project);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
    setSelectedProject(null);
  };

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
            <Route path="/projects" element={<Projects openPopup={openPopup} closePopup={closePopup} popupOpen={popupOpen} selectedProject={selectedProject} />} />
          </Routes>
        </main>
        <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
