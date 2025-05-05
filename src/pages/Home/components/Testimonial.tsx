import { useEffect, useMemo, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=3",
    comment: "Amazing service! Totally transformed my biking experience.",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/150?img=5",
    comment: "Love the design and smooth ride. Highly recommended!",
  },
  {
    id: 3,
    name: "Ali Khan",
    image: "https://i.pravatar.cc/150?img=7",
    comment: "Customer service is top-notch. Prompt and professional.",
  },
  {
    id: 4,
    name: "Sophia Lee",
    image: "https://i.pravatar.cc/150?img=9",
    comment: "Stylish and reliable bikes. Couldn’t ask for more.",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const groupSize = 2;
  const totalGroups = Math.ceil(testimonials.length / groupSize);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalGroups);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, totalGroups]);

  const groupedTestimonials = useMemo(() => {
    const groups = [];
    for (let i = 0; i < testimonials.length; i += groupSize) {
      groups.push(testimonials.slice(i, i + groupSize));
    }
    return groups;
  }, []);

  return (
    <div
      className=" py-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-3xl text-center font-bold mb-8">
        What Our Riders Say
      </h2>

      <div className="relative h-[300px] md:h-[250px] transition-all duration-700 ease-in-out">
        {groupedTestimonials.map((group, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex justify-between gap-6 transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {group.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full bg-base-100"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                </div>
                <div className=" italic text-sm flex items-start gap-2">
                  <FaQuoteLeft className="text-yellow-500 mt-1" />
                  <p>{testimonial.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {groupedTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-yellow-500 scale-125"
                : "bg-white border border-gray-400 hover:bg-yellow-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
