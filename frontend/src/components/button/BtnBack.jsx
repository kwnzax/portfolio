import { Link } from "react-router-dom"
import '../../assets/css/components/button/btnBack.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

function BtnBack() {
    return (
        <Link to="/portfolio" >
            <button className="btnBack"> <FontAwesomeIcon icon={faArrowLeft} /> Voir d'autres projet</button>
        </Link>
    )
}

export default BtnBack