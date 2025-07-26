import { useState } from "react";
import dataProjet from '../data/projet.json'
import BtnAdd from "../components/button/BtnAdd"
import Card from "../components/Card"
import Contact from "../components/Contact"
import ProjetModal from '../components/ProjetModal'

function Portfolio() {
    const [openModal, setOpenModal] = useState(null);

    const open = (type) => setOpenModal(type);
    const close = () => setOpenModal(null);

    return (
        <>
            <div className='title'>
                <h1>Porfolio</h1>
                <BtnAdd onClick={() => open("projet")}/>
            </div>
            <ProjetModal isOpen={openModal === "projet"} onClose={close}/>
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