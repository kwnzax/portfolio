import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


function BtnProjet({id}) {
    return (
        <Link to={`/projets/${id}`} className='btn'>
            Voir le projet <FontAwesomeIcon icon={faArrowRight} className='icon'/>
        </Link>
    )
}

export default BtnProjet