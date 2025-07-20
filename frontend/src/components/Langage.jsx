function Langage ({logo, name}) {
    return (
        <>
        <img src={logo} alt={name}/>
        <div>
            <h4>{name}</h4>
            <p>Niveau de maitrise</p>
            <div>jauge</div>
        </div>
        </>
    )
}

export default Langage