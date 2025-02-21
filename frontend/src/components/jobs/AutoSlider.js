import React from 'react';
import './AutoSlider.css'; // Import your CSS file

const AutoSlider = () => {
  const slides = [
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/038/950/888/small_2x/ai-generated-portrait-of-a-beautiful-young-and-intelligent-looking-indian-asian-woman-student-wearing-a-white-shirt-photo.jpg",
      alt: "Slide 1"
    },
    {
      src: "https://badshah.io/kickstarting-in-cybersecurity-for-indian-students/cover-image.jpg",
      alt: "Slide 2"
    },
    {
      src: "https://t3.ftcdn.net/jpg/09/22/32/52/360_F_922325240_lqzg51fGQiNlTNJgph6UPYVXbCbVJyB0.jpg",
      alt: "Slide 3"
    },
  ];

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
      data-bs-wrap="true"
      style={{ marginLeft:'20px', marginRight:'20px' }}
    >
      <div className="carousel-inner mt-5">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} className="carousel-image" />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default AutoSlider;

