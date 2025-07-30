import { useRef } from "react";
import "../assets/css/components/slider.css";

function Slider({ images }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.offsetWidth * 0.25;
        container.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="galleryWrapper">
            <button className="navBtnLeft" onClick={() => scroll("left")}>
                ‹
            </button>

            <div className="imageGrid" ref={scrollRef}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`projet-${index}`} className="galleryImg" />
                ))}
            </div>

            <button className="navBtnRight" onClick={() => scroll("right")}>
                ›
            </button>
        </div>
    );
}

export default Slider;