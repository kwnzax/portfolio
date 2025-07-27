import '../assets/css/components/tools.css'
import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'

function Tool({logo, name}) {
    return (
        <div className='toolCard'>
            <img src={logo} alt={name} className='toolImg'/>
            <span className='toolName'>{name}</span>
            <AdminAcces>
                <BtnDelete />
            </AdminAcces>
        </div>
    )
}

export default Tool