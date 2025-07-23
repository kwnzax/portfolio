import BtnProjet from "./button/BtnProjet.jsx"


function MiniCard({ title, minia }) {
    return (
        <div>
            <div className="miniCard">
                <img src={minia} alt={title} />
                <h3>{title}</h3>
            </div>
            <div className="miniCardContent">
                <h3>{title}</h3>
                <p> <Description /> </p>
                <BtnProjet />
            </div>
        </div>
    )
}

export default MiniCard