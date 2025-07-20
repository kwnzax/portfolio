function Tool({logo, name}) {
    return (
        <>
            <img src={logo} alt={name}/>
            <span>{name}</span>
        </>
    )
}

export default Tool