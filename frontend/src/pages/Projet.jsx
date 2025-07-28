import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Tags from '../components/Tags'
import Description from '../components/description'
import Contrainte from '../components/Contrainte'
import Slider from '../components/Slider'
import BtnBack from "../components/button/BtnBack"
import BtnGithub from '../components/button/BtnGithub'
import Contact from "../components/Contact"


function Projet() {
    const { id } = useParams();
    const [projet, setProjet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/api/projets/${id}`)
            .then((res) => res.json())
            .then((data) => setProjet(data))
            .catch(() => navigate("/"));
    }, [id]);

    if (!projet) return <p></p>;

    return (
        <div>
            <div >
                <h1>{projet.title}</h1>
                <Tags tags={projet.tags} />
            </div>
            <div >
                <div>
                    <Description
                        minia={projet.minia}
                        description={projet.description}
                    />
                    <Contrainte contrainte={projet.contrainte} />
                </div>
                <Slider images={projet.images} />
            </div>
            <div>
                <BtnBack />
                <BtnGithub lien={projet.lien}/>
            </div>
            <Contact />
        </div>
    )
}

export default Projet

