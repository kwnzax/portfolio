import {Link} from 'react-router-dom'


function BtnProjet({id}) {
    return (
        <Link to={`/projets/${id}`} >
            Voir le projet
        </Link>
    )
}

export default BtnProjet