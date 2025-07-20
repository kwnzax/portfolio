import { Link } from 'react-router-dom';
import MiniCard from '../components/MiniCard.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx';

function Home() {
  return (
    <>
      <section>
        <div className='intro'>
          <h1>Kwnzax</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>
      <section>
        <h2>Portfolio</h2>
        <div className='miniCardContainer'>
          {/*{data.map(() => (
            <MiniCard
              key={projet.id}
              id={projet.id}
              title={projet.title}
              minia={projet.cover}
            />
          ))}*/}
        </div>
        <Link to="/portfolio">Afficher plus</Link>
      </section>
      <section>
        <h2>Outils</h2>
        <div className='outilContainer'>

        </div>
      </section>
      <section>
        <About />
      </section>
      <section>
        <h2>Langages</h2>
        <div className='langagesContainer'>

        </div>
      </section>
      <section>
        <Contact />
      </section>

    </>
  );
}

export default Home;