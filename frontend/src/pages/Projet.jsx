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
        const foundProjet = data.find(item => item.id === id);

        if (foundProjet) {
            setProjet(foundProjet);
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

