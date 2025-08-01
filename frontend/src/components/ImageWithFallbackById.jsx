
import { useState } from "react";

function ImageWithFallbackById({ src, alt, id, type = "default", index = null, className, ...props }) {
  const [attempt, setAttempt] = useState(0);
  const fallbackExtensions = ["webp"];

  const fileBase = index !== null
    ? `${id}-${type}-${index}`
    : `${id}-${type}`;

  const fallbackSrc = `/images/${fileBase}.${fallbackExtensions[attempt]}`;

  const handleError = (e) => {
    if (attempt < fallbackExtensions.length - 1) {
      setAttempt(prev => prev + 1);
      e.target.src = `../assets/images/${fileBase}.${fallbackExtensions[attempt + 1]}`;
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

export default ImageWithFallbackById;

  