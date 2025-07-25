import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'

function BtnUpdate() {
    return (
        <button className='admin'><FontAwesomeIcon icon={faPenToSquare} /></button>
    )
}

export default BtnUpdate