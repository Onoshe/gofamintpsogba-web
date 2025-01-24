'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const InfiniteHorizontalScroll = ({ images }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollSpeed = 2; // Speed of scroll

  const containerRef = React.useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      // Reset scroll to start when the end is reached
      setScrollPosition(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + scrollSpeed); // Increase scroll position
    }, 16); // Update every frame (60fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
      }}
      onScroll={handleScroll}
    >
      <motion.div
        style={{ display: 'flex' }}
        initial={{ x: 0 }}
        animate={{ x: -scrollPosition }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`image-${index}`}
            style={{
              width: 'auto',
              height: '100%',
              maxWidth: '200px', // Adjust image width as needed
              marginRight: '10px',
            }}
          />
        ))}
        {/* Duplicate the images to create an infinite loop effect */}
        {images.map((img, index) => (
          <img
            key={`duplicate-${index}`}
            src={img.src}
            alt={`duplicate-image-${index}`}
            style={{
              width: 'auto',
              height: '100%',
              maxWidth: '200px',
              marginRight: '10px',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteHorizontalScroll;
