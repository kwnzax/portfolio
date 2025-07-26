import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'

function Tool({logo, name}) {
    return (
        <div>
            <img src={logo} alt={name}/>
            <span>{name}</span>
            <AdminAcces>
                <BtnDelete />
            </AdminAcces>
        </div>
    )
}

export default Tool