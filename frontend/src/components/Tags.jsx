import '../assets/css/components/tags.css'

function Tags({ tags }) {
    const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? JSON.parse(tags)
      : [];

    return (
        <div className="tagsContainer">
            {tagList.map((tag, index) => (
                <span className="tagBadge" key={index}>
                    {tag}
                </span>))}
        </div>
    )
}

export default Tags