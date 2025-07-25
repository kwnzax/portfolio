import dataProjet from '../data/projet.json'
import BtnAdd from "../components/button/BtnAdd"
import Card from "../components/Card"
import Contact from "../components/Contact"

function Portfolio() {
    return (
        <>
            <div className='title'>
                <h1>Porfolio</h1>
                <BtnAdd />
            </div>
            <div className="cardContainer">
                {dataProjet.map((projet) => (
                    <Card
                        key={projet.id}
                        id={projet.id}
                        title={projet.title}
                        cover={projet.minia}
                    />
                ))}
            </div>
            <Contact />
        </>
    )
}

export default Portfolio