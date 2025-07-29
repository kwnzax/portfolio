import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/components/button/btnGithub.css'

function BtnGithub ({codeGithub}) {
    return (
        <Link className="btnGithub" to={codeGithub}>
            <button >Repo Github <FontAwesomeIcon icon={faLink} /></button>
        </Link>
    )
}

export default BtnGithub