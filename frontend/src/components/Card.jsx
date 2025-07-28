import { Link } from 'react-router-dom'
import '../assets/css/components/card.css'
import BtnUpdate from './button/BtnUpdate'
import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'



function Card({ id, title, minia, onEdit }) {
    return (
        <div className='card'>
            <Link to={`/projet/${id}`}>
                <img src={minia} alt={title} />
                <h2 className='cardTitle'>{title}</h2>
            </Link>
            <AdminAcces>
                <BtnUpdate id={id} onClick={onEdit}/>
                <BtnDelete id={id} type="projets" onDelete={() => window.location.reload()}/>
            </AdminAcces>
        </div>
    )
}

export default Card