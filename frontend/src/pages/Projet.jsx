import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../assets/css/pages/projet.css'
import Tags from '../components/Tags'
import Description from '../components/Description'
import Problematiques from '../components/Problematiques'
import Contrainte from '../components/Contrainte'
import Slider from '../components/Slider'
import BtnBack from "../components/button/BtnBack"
import BtnGithub from '../components/button/BtnGithub'
import Contact from "../components/Contact"
import AdminAcces from '../components/AdminAcces'
import BtnUpdate from '../components/button/BtnUpdate'
import ProjetModal from '../components/modal/ProjetModal'


function Projet() {
    const { id } = useParams();
    const [projet, setProjet] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/projets/${id}`)
            .then((res) => res.json())
            .then((data) => setProjet(data))
            .catch(() => navigate("/"));
    }, [id]);

    if (!projet) return <p></p>;

    return (
        <div className='page'>
            <div className='projet'>
                <section className='projetId'>
                    <div className='projetTitle'>
                        <h1>{projet.title}</h1>
                        <div className='projetTags'>
                            <Tags tags={projet.tags} />
                        </div>
                        <AdminAcces>
                            <BtnUpdate id={projet._id} onClick={handleEditClick} className='edit' />
                        </AdminAcces>
                        <ProjetModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSuccess={() => {
                                handleCloseModal();
                                window.location.reload();
                            }}
                            mode="edit"
                            projet={projet}
                        />
                    </div>
                    <div className='projetMain' >
                        <div >
                            <Description
                                minia={projet.minia}
                                description={projet.description}
                            />
                            {projet.problematiques && projet.problematiques.length > 0 && (
                                <Problematiques problematiques={projet.problematiques} />
                            )}
                            <Contrainte contrainte={projet.contrainte} />
                        </div>
                        <Slider images={projet.images} />
                    </div>
                    <div className='projetBtn'>
                        <BtnBack />
                        <BtnGithub codeGithub={projet.codeGithub} />
                    </div>
                </section>
                <section >
                    <Contact />
                </section>
            </div>
        </div>
    )
}

export default Projet