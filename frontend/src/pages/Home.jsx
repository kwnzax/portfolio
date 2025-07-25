import { Link } from 'react-router-dom'
import '../assets/css/pages/Home.css'
import dataProjet from '../data/projet.json'
import dataTool from '../data/tool.json'
import dataLangage from '../data/langage.json'
import MiniCard from '../components/MiniCard.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Socials from '../components/Socials.jsx'
import BtnAdd from '../components/button/BtnAdd.jsx'

function Home() {
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
          <BtnAdd />
        </div>
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
          <BtnAdd />
        </div>
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
          <h2>Langages</h2>
          <BtnAdd />
        </div>
        <div className='langagesContainer'>
          {dataLangage.map(() => (
            <Langage
              key={langage.id}
              id={langage.id}
              title={langage.name}
              minia={langage.logo}
              level={langage.level}
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