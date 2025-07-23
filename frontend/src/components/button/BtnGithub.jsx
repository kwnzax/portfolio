import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLink} from '@fortawesome/free-solid-svg-icons'

function BtnGithub ({codeGithub}) {
    return (
        <Link to={codeGithub}>
            <button>Repo Github <FontAwesomeIcon icon={faLink} /></button>
        </Link>
    )
}

export default BtnGithub