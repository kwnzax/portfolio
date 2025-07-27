import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'

function BtnUpdate() {
    return (
        <button className='admin edit'><FontAwesomeIcon icon={faPenToSquare} size='xl'/></button>
    )
}

export default BtnUpdate