import logo from '../assets/images/logo.svg'
import Nav from './Nav'
import BtnContact from './BtnContact'


function Header() {
    return (
        <nav>
            <img src={logo} alt='Kwnzax logo' />
            <Nav />
            <BtnContact />
        </nav>
    )
}

export default Header