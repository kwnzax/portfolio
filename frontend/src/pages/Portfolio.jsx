import { useState, useEffect} from "react";
import BtnAdd from "../components/button/BtnAdd"
import Card from "../components/Card"
import Contact from "../components/Contact"
import ProjetModal from '../components/modal/ProjetModal'
import AdminAcces from "../components/AdminAcces";

function Portfolio() {
    const [projets, setProjets] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    const open = (type) => setOpenModal(type);
    const close = () => setOpenModal(null);

    const fetchProjets = async () => {
        const res = await fetch("http://localhost:3000/api/projets");
        if (!res.ok) {
          console.error("Erreur fetch tools");
          return;
        }
        const data = await res.json();
        setProjets(data);
      };

    useEffect(() => { fetchProjets() }, []);

    return (
        <>
            <div className='title'>
                <h1>Porfolio</h1>
                <AdminAcces>
                    <BtnAdd onClick={() => open("projet")}/> 
                </AdminAcces>
            </div>
            <ProjetModal isOpen={openModal === "projet"} onClose={close} onSuccess={() => { fetchProjets() }}/>
            <div className="cardContainer">
                {projets.map((projet) => (
                    <Card
                        key={projet.id}
                        id={projet.id}
                        title={projet.title}
                        minia={projet.minia}
                    />
                ))}
            </div>
            <Contact />
        </>
    )
}

export default Portfolio