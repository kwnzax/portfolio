import { Link } from "react-router-dom"

function BtnBack() {
    return (
        <Link to={portfolio}>
            <button>Voir d'autres projet</button>
        </Link>
    )
}

export default BtnBack