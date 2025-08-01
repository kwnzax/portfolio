import '../assets/css/components/miniCard.css'
import Tags from "./Tags.jsx"
import BtnProjet from "./button/BtnProjet.jsx"


function MiniCard({ id, title, minia, tags }) {
    return (
        <div className='miniCard'>
            <div className="miniCardCover">
                <img src={minia} alt={'projet' + title} />
            </div>
            <div className="overlay">
                <h3>{title}</h3>
                <Tags tags={tags} />
                <BtnProjet id={id} />
            </div>
        </div>
    )
}

export default MiniCard