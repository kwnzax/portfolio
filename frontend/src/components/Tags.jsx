

function Tags({ tags }) {
    return (
        <div className="tagsContainer">
            {tags.map((tag, id) => (
                <span key={id} className="tag">
                    {tag}
                </span>
            ))}
        </div>
    )
}

export default Tags