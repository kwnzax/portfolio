import { Link } from 'react-router-dom'
import BtnUpdate from './button/BtnUpdate'
import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'



function Card({ id, title, minia }) {
    return (
        <div>
            <div>
                <Link to={`/projet/${id}`}>
                    <img src={minia} alt={title} />
                    <h2>{title}</h2>
                </Link>
            </div>
            <AdminAcces>
                <BtnUpdate />
                <BtnDelete />
            </AdminAcces>
        </div>
    )
}

export default Card