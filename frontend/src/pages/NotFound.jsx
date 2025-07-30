import { Link } from 'react-router-dom'
import '../assets/css/pages/notFound.css'

function NotFound() {
  return (
    <div className='page'>
      <div className="notFound">
        <h1>404</h1>
        <p>Il n'y a rien à voir ici...</p>
        <Link to="/">Retourner sur la page d'accueil</Link>
      </div>
    </div>
  );
}

export default NotFound;