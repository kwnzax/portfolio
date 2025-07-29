import { useState, useEffect } from "react";
import '../assets/css/pages/portfolio.css'
import BtnAdd from "../components/button/BtnAdd"
import Card from "../components/Card"
import Contact from "../components/Contact"
import ProjetModal from '../components/modal/ProjetModal'
import AdminAcces from "../components/AdminAcces";

function Portfolio() {
    const [projets, setProjets] = useState([]);
    const [selectedProjet, setSelectedProjet] = useState(null);
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
        setProjets(data.reverse());
    };

    useEffect(() => { fetchProjets() }, []);

    return (
        <div className="page">
            <div className="portfolioPage">
                <section className="portfolio">
                    <div className='title'>
                        <h1>Porfolio</h1>
                        <AdminAcces>
                            <BtnAdd onClick={() => open("projet")} />
                        </AdminAcces>
                    </div>
                    <ProjetModal isOpen={openModal === "projet"} onClose={close} onSuccess={() => { fetchProjets() }} />
                    <ProjetModal
                        isOpen={openModal === "editProjet"}
                        onClose={() => {
                            close();
                            setSelectedProjet(null);
                        }}
                        onSuccess={() => {
                            fetchProjets();
                            setSelectedProjet(null);
                        }}
                        mode="edit"
                        projet={selectedProjet}
                    />
                    <div className="cardContainer">
                        {projets.map((projet) => (
                            <Card
                                key={projet._id}
                                id={projet._id}
                                title={projet.title}
                                minia={projet.minia}
                                onEdit={() => {
                                    setSelectedProjet(projet);
                                    open("editProjet");
                                }}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <Contact />
                </section>
            </div>
        </div>
    )
}

export default Portfolio