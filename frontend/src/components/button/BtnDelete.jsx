import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

function BtnDelete() {
    return (
        <button className='admin trash'><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
    )
}

export default BtnDelete