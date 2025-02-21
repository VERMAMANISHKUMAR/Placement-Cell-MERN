import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://static.vecteezy.com/system/resources/thumbnails/038/950/888/small_2x/ai-generated-portrait-of-a-beautiful-young-and-intelligent-looking-indian-asian-woman-student-wearing-a-white-shirt-photo.jpg',
      
    },
    {
      image: 'https://badshah.io/kickstarting-in-cybersecurity-for-indian-students/cover-image.jpg',
    
    },
    {
      image: 'https://badshah.io/kickstarting-in-cybersecurity-for-indian-students/cover-image.jpg',
      
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 3) % slides.length);
    }, 1000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [slides.length]); // Add slides.length to the dependency array

  return (
    <div className="slide-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;