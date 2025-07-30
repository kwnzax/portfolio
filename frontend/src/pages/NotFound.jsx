import { Link } from 'react-router-dom'
import '../assets/css/pages/notFound.css'
import catEatingChips from '../assets/images/catEatingChips.gif'

function NotFound() {
  return (
    <div className='page'>
      <div className="notFound">
        <img src={catEatingChips}/>
        <h1>404</h1>
        <p>Il n'y a rien à voir ici...</p>
        <Link to="/">Retourner sur la page d'accueil</Link>
      </div>
    </div>
  );
}

export default NotFound;