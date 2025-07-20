import BtnPageSite from './BtnPageSite'


function MiniCard({ id, title, minia }) {
    return (
        <>
            <div className="miniCardFront">
                <img src={minia} alt={title} />
                <h3>{title}</h3>
            </div>
            <div className="miniCardContent">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <BtnPageSite />
            </div>
        </>
    )
}

export default MiniCard