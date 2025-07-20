import { Link } from 'react-router-dom';


function Nav() {
    return (
        <div>
            <button>🌑</button>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">À propos</Link></li>
            </ul>
        </div>
    )
}

export default Nav