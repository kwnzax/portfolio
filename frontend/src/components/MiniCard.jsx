import Tags from "./Tags.jsx"
import BtnProjet from "./button/BtnProjet.jsx"


function MiniCard({ title, minia, tags}) {
    return (
        <div>
            <div className="miniCard">
                <img src={minia} alt={title} />
                <h3>{title}</h3>
            </div>
            <div className="miniCardContent">
                <h3>{title}</h3>
                <Tags tags={tags}/> 
                <BtnProjet />
            </div>
        </div>
    )
}

export default MiniCard