function Description({minia, description}) {
    return (
        <div className='projetMinia'>
            <div className="projetMiniaImg">
                <img src={minia}/>
            </div>
            <div className="projetDescription">
                <h2>Déscription</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Description