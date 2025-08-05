import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'

function Socials() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="https://github.com/kwnzax" target="_blank">
                        <FontAwesomeIcon icon={faGithub}/>
                    </Link>
                </li>
                <li>
                    <Link to="https://www.linkedin.com/in/kwnzax" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Socials