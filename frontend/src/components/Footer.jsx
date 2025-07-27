import { useState, useEffect } from "react";
import '../assets/css/components/footer.css'
import LoginModal from './modal/LoginModal';
import Socials from './Socials'

function Footer() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setIsLoginOpen(false);
    };

        const handleLogout = () => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            window.location.reload();
        };

    return (
        <div className='footer'>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />
            {!isAuthenticated ? (
                <button className='footerBtn' onClick={() => setIsLoginOpen(true)}>Connexion</button>
            ) : (
                <button className='footerBtn' onClick={handleLogout}>Déconnexion</button>
            )}
            <p>© 2025 Kwnzax - Tous droits réservés</p>
            <div className='footerSocials'>
                <Socials />
            </div>
        </div>
    )
}

export default Footer