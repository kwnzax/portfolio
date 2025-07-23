import { useState } from 'react';

function Slider({ images }) {
    if (!images || images.length === 0) {
        return null;}

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlide = images.length;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlide);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlide) % totalSlide);
    };

    return (
        <div className="slider">
            {totalSlide > 1 && (
                <div className="sliderNavBtn">
                    <button className="prevBtn" onClick={prevSlide}>‹</button>
                    <button className="nextBtn" onClick={nextSlide}>›</button>
                </div>
            )}

            <img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
            />
        </div>
    );
}

export default Slider;