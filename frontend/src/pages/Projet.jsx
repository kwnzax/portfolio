import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tags from '../components/Tags'
import Description from '../components/description'
import Contrainte from '../components/Contrainte'
import Slider from '../components/Slider'
import BtnBack from "../components/button/BtnBack"
import BtnGithub from '../components/button/BtnGithub'
import Contact from "../components/Contact"


function Projet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projet, setProjet] = useState(null);

    useEffect(() => {
        const fetchOneProjet = async () => {
            const res = await fetch("http://localhost:3000/api/projets/:id");
            if (!res.ok) {
              console.error("Erreur fetch projet");
              return;
            }
            const data = await res.json();
            setProjet(data);
          };
        if (fetchOneProjet) {
            setProjet(fetchOneProjet);
        } else {
            navigate('/404');
        }
    }, [id, navigate]);

    if (!projet) {
        return <></>;
    }

    return (
        <div>
            <div >
                <h1>{Projet.title}</h1>
                <Tags />
            </div>
            <div >
                <div>
                    <Description />
                    <Contrainte />
                </div>
                <Slider />
            </div>
            <div>
                <BtnBack />
                <BtnGithub />
            </div>
            <Contact />
        </div>
    )
}

export default Projet

