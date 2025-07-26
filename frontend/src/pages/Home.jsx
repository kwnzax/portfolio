import { Link } from 'react-router-dom'
import { useState } from "react";
import '../assets/css/pages/Home.css'
import dataProjet from '../data/projet.json'
import dataTool from '../data/tool.json'
import dataSkills from '../data/skills.json'
import MiniCard from '../components/MiniCard.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Socials from '../components/Socials.jsx'
import BtnAdd from '../components/button/BtnAdd.jsx'
import ToolModal from '../components/modal/ToolModal.jsx'
import SkillModal from '../components/modal/SkillModal.jsx'
import ProjetModal from '../components/modal/ProjetModal.jsx'
import AdminAcces from '../components/AdminAcces.jsx';


function Home() {
  const [openModal, setOpenModal] = useState(null);

  const open = (type) => setOpenModal(type);
  const close = () => setOpenModal(null);


  return (
    <div className='home'>
      <section className='homeIntro'>
        <div className='textIntro'>
          <h1>Kwnzax</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className='socialsIntro'><Socials /></div>
      </section>
      <section>
        <div className='title'>
          <h2>Portfolio</h2>
          <AdminAcces>
            <BtnAdd onClick={() => open("projet")}/>
          </AdminAcces>
        </div>
        <ProjetModal isOpen={openModal === "projet"} onClose={close}/>
        <div className='miniCardContainer'>
          {dataProjet.map(() => (
            <MiniCard
              key={projet.id}
              id={projet.id}
              title={projet.title}
              minia={projet.cover}
              description={projet.description}
            />
          ))}
        </div>
        <Link to="/portfolio" className='showMore'>Afficher plus</Link>
      </section>
      <section>
        <div className='title'>
          <h2>Outils</h2>
          <AdminAcces>
            <BtnAdd onClick={() => open("tool")}/>
          </AdminAcces>
        </div>
        <ToolModal isOpen={openModal === "tool"} onClose={close} />
        <div className='outilContainer'>
          {dataTool.map(() => (
            <Tool
              key={tool.id}
              id={tool.id}
              title={tool.name}
              minia={tool.logo}
            />
          ))}
        </div>
      </section>
      <section className='homeAbout'>
        <About />
      </section>
      <section>
        <div className='title'>
          <h2>Skills</h2>
          <AdminAcces>
            <BtnAdd onClick={() => open("skill")}/>
          </AdminAcces>
        </div>
        <SkillModal isOpen={openModal === "skill"} onClose={close}/>
        <div className='skillsContainer'>
          {dataSkills.map(() => (
            <Skills
              key={skills.id}
              id={skills.id}
              title={skills.name}
              minia={skills.logo}
              level={skills.level}
            />
          ))}
        </div>
      </section>
      <section>
        <Contact />
      </section>

    </div>
  );
}

export default Home;