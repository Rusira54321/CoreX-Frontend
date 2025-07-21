import React, { useEffect, useState } from 'react'
import watch1 from "./assets/watch1.jpg"
import watch2 from "./assets/watch2.jpg"
import watch3 from "./assets/watch3.jpg"
import watch4 from "./assets/watch4.jpg"

const images = [watch1, watch2, watch3, watch4];

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover transition-all duration-1000 ease-in-out"
      />
      {/* Optional: Dots */}
<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
  {images.map((_, i) => (
    <div
      key={i}
      className={`
        rounded-full 
        ${i === currentIndex ? 'bg-blue-400' : 'bg-gray-300'} 
        w-2 h-2 sm:w-3 sm:h-3
      `}
    />
  ))}
</div>
    </div>
  );
};

export default ImageSlideshow;
