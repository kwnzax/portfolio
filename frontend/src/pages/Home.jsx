import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import '../assets/css/pages/Home.css'

import MiniCard from '../components/MiniCard.jsx'
import Tool from '../components/Tool.jsx'
import Skills from '../components/Skills.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Socials from '../components/Socials.jsx'
import BtnAdd from '../components/button/BtnAdd.jsx'
import ToolModal from '../components/modal/ToolModal.jsx'
import SkillModal from '../components/modal/SkillModal.jsx'
import ProjetModal from '../components/modal/ProjetModal.jsx'
import AdminAcces from '../components/AdminAcces.jsx';
import BtnContact from '../components/button/BtnContact.jsx';


function Home() {
  const location = useLocation();
  const [projets, setProjets] = useState([]);
  const [tools, setTools] = useState([]);
  const [skills, setSkills] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  const open = (type) => setOpenModal(type);
  const close = () => setOpenModal(null);

  const fetchProjets = async () => {
    const res = await fetch("http://localhost:3000/api/projets");
    if (!res.ok) {
      console.error("Erreur fetch projets");
      return;
    }
    const data = await res.json();
    setProjets(data.slice(-6).reverse());
  };

  const fetchTools = async () => {
    const res = await fetch("http://localhost:3000/api/tools");
    if (!res.ok) {
      console.error("Erreur fetch tools");
      return;
    }
    const data = await res.json();
    setTools(data);
  };

  const fetchSkills = async () => {
    const res = await fetch("http://localhost:3000/api/skills");
    if (!res.ok) {
      console.error("Erreur fetch skills");
      return;
    }
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchTools();
    fetchProjets();
    fetchSkills();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='page'>
      <div className='home'>
        <section className='homeIntro'>
          <div className='textIntro'>
            <h1>Kwnzax</h1>
            <p>« Any fool can write code that a computer can understand. Good programmers write code that humans can understand. » — <span>Martin Fowler</span></p>
          </div>
          <div className='contactIntro'>
            <BtnContact />
            <div className='socialsIntro'>
              <Socials /></div>
          </div>
        </section>
        <section className='homePortfolio'>
          <div className='title'>
            <h2>Portfolio</h2>
            <AdminAcces>
              <BtnAdd onClick={() => open("projet")} />
            </AdminAcces>
          </div>
          <ProjetModal isOpen={openModal === "projet"} onClose={close} onSuccess={() => { fetchProjets() }} />
          <div className='miniCardContainer'>
            {projets.map((projet) => (
              <MiniCard
                key={projet._id}
                id={projet._id}
                title={projet.title}
                minia={projet.minia}
                tags={projet.tags}
              />
            ))}
          </div>
          <Link to="/portfolio" className='showMore'>Afficher plus</Link>
        </section>
        <section className='homeOutils'>
          <div className='title'>
            <h2>Outils</h2>
            <AdminAcces>
              <BtnAdd onClick={() => open("tool")} />
            </AdminAcces>
          </div>
          <ToolModal isOpen={openModal === "tool"} onClose={close} onSuccess={() => { fetchTools() }} />
          <div className='outilContainer'>
            {tools.map((tool) => (
              <Tool
                key={tool._id}
                id={tool._id}
                name={tool.name}
                logo={tool.logo}
              />
            ))}
          </div>
        </section>
        <section className='homeAbout' >
          <About />
        </section>
        <section className='homeSkills'>
          <div className='title'>
            <h2>Skills</h2>
            <AdminAcces>
              <BtnAdd onClick={() => open("skill")} />
            </AdminAcces>
          </div>
          <SkillModal isOpen={openModal === "skill"} onClose={close} onSuccess={() => { fetchSkills() }} />
          <div className='skillsContainer'>
            {skills.map((skills) => (
              <Skills
                key={skills._id}
                id={skills._id}
                name={skills.name}
                logo={skills.logo}
                level={skills.level}
              />
            ))}
          </div>
        </section>
        <section>
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default Home;