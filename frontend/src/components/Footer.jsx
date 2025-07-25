import '../assets/css/components/footer.css'
import Socials from './Socials'

function Footer() {
    return (
        <div className='footer'>
            <a href="#">Connexion</a>
            <p>© 2025 Kwnzax - Tous droits réservés</p>
            <div className='footerSocials'>
                <Socials />
            </div>
        </div>
    )
}

export default Footer