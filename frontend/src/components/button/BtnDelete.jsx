import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

function BtnDelete() {
    return (
        <button className='admin'><FontAwesomeIcon icon={faTrashCan} /></button>
    )
}

export default BtnDelete