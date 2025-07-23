

function Tool({logo, name}) {
    return (
        <div>
            <img src={logo} alt={name}/>
            <span>{name}</span>
        </div>
    )
}

export default Tool