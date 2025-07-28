

function Tags({ tags }) {
    return (
        <div className="tagsContainer">
            {tags && tags.map(tag => (
                <span key={tag}>{tag}</span>
            ))}
        </div>
    )
}

export default Tags