import { useState, useEffect } from "react";
import bike1 from '../../../assets/images/bike-1.jpg';
import bike2 from '../../../assets/images/bike-2.jpg';
import bike3 from '../../../assets/images/bike-3.jpg';
import bike4 from '../../../assets/images/bike-4.jpg';
import bike5 from '../../../assets/images/bike-5.jpg';
import { Link } from "react-router-dom";

const images = [
  {
    src: bike1,
    title: "High-Performance Road Bikes",
    description: "Experience the thrill of speed with our latest road bikes.",
  },
  {
    src: bike2,
    title: "Conquer the Trails",
    description: "Explore rugged terrains with our top mountain bikes.",
  },
  {
    src: bike3,
    title: "City Biking Made Easy",
    description: "Commute in style with our comfortable city bikes.",
  },
  {
    src: bike4,
    title: "Go Green with E-Bikes",
    description: "Eco-friendly rides with powerful electric bikes.",
  },
  {
    src: bike5,
    title: "Extreme BMX Action",
    description: "Unleash your skills with high-performance BMX bikes.",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden"
    >
      <div className="w-full h-full relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-8 md:p-16 text-white max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold relative">
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 transition-all duration-500"></span>
                  {image.title}
                </h2>
                <p className="text-lg md:text-xl mb-5">{image.description}</p>
                <Link to="/products" className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 font-semibold rounded-md transition-all">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
