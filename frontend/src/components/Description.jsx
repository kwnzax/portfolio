function Description({minia, description}) {
    return (
        <div>
            <div>
                <img src={minia}/>
            </div>
            <div>
                <h2>Déscription</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Description