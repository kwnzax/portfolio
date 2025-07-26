import '../../assets/css/components/button/btnAdd.css'

function BtnAdd({ onClick }) {
    return (
        <button className="admin btnAdd" onClick={onClick}>Add +</button>
    )
}

export default BtnAdd