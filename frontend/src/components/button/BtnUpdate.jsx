import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function BtnUpdate({ onClick }) {
    return (
        <button className='admin edit' onClick={onClick}>
            <FontAwesomeIcon icon={faPenToSquare} size='xl' />
        </button>
    )
}

export default BtnUpdate