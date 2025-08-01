import '../assets/css/components/miniCard.css'
import ImageWithFallbackById from './ImageWithFallbackById.jsx';
import Tags from "./Tags.jsx"
import BtnProjet from "./button/BtnProjet.jsx"


function MiniCard({ id, title, minia, tags }) {
    return (
        <div className='miniCard'>
            <div className="miniCardCover">
                <ImageWithFallbackById
                    src={minia}
                    alt={'projet' + title}
                    id={id}
                    type="minia"
                />
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