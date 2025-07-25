import '../assets/css/components/header.css'
import logo from '../assets/images/logo.svg'
import Nav from './Nav'
import BtnContact from './button/BtnContact'


function Header() {
    return (
        <nav>
            <img src={logo} alt='Kwnzax logo' className='logoKwnzax' />
            <div className='navBtn'>
                <Nav />
                <BtnContact />
            </div>
        </nav>
    )
}

export default Header