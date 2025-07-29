import '../../assets/css/components/button/btnAdd.css'

function BtnAdd({ onClick }) {
    return (
        <button className="btnAdd" onClick={onClick}>Add +</button>
    )
}

export default BtnAdd