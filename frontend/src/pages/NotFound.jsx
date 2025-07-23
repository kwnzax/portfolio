import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="notFound pages">
      <h1>404</h1>
      <p>Il n'y a rien à voir ici...</p>
      <Link to="/">Retourner sur la page d'accueil</Link>
    </div>
  );
}

export default NotFound;