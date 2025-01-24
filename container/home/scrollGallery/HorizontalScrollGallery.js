'use client';

import React, { useEffect, useRef } from "react";


const AutoScrollGallery = ({ photos, autoScrollSpeed = 10 }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += autoScrollSpeed;

        // Reset to the start when the scroll reaches the duplicated set
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth / 2
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, 30);
    return () => clearInterval(interval);
  }, [autoScrollSpeed]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth gap-4 py-4 scrollbar-hide"
      >
        {/* Render photos twice for seamless looping */}
        {[...photos, ...photos, ...photos, ...photos, ...photos].map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 h-48 rounded-lg overflow-hidden shadow-md"
          >
           <img
                src={photo.src}
                alt={photo.alt || `Photo ${index + 1}`}
                className="w-full h-full object-cover"
                //src="https://example.com/hero.jpg"
                //alt="Landscape picture"
                width={800}
                height={500}
                />
          </div>
        ))}
      </div>
    </div>
  );
};


const HorizontalScrollGallery = ({ photos, autoScrollSpeed = 2 }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += autoScrollSpeed;
        // Loop back to the start when the end is reached
        if (
          scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, 30); // Adjust the interval for smoothness
    return () => clearInterval(interval);
  }, [autoScrollSpeed]);

  const handleScrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Scroll Left Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 shadow-md hover:bg-gray-800 focus:outline-none"
      >
        &#8592;
      </button>

      {/* Auto-scrolling Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth gap-4 py-4 scrollbar-hide"
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 h-48 rounded-lg overflow-hidden shadow-md"
          >
            
            <img
                src={photo.src}
                alt={photo.alt || `Photo ${index + 1}`}
                className="w-full h-full object-cover"
                //src="https://example.com/hero.jpg"
                //alt="Landscape picture"
                width={800}
                height={500}
                />
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 shadow-md hover:bg-gray-800 focus:outline-none"
      >
        &#8594;
      </button>
    </div>
  );
};

//export default HorizontalScrollGallery;
export default AutoScrollGallery