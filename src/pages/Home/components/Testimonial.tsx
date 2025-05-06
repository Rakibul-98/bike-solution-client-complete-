import { useEffect, useMemo, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=3",
    comment:
      "Amazing service! Totally transformed my biking experience. The bike quality exceeded my expectations, and the support team was incredibly helpful throughout the process. I’ve been using it for over 6 months and couldn’t be happier with my purchase.",
    rating: 5,
    location: "New York, USA",
    date: "2024-12-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.pravatar.cc/150?img=5",
    comment:
      "Love the design and smooth ride. Highly recommended! From the packaging to the first ride, everything felt premium. It’s perfect for my daily commute and makes me look forward to going out every morning.",
    rating: 4,
    location: "London, UK",
    date: "2025-01-15",
  },
  {
    id: 3,
    name: "Ali Khan",
    image: "https://i.pravatar.cc/150?img=7",
    comment:
      "Customer service is top-notch. Prompt and professional. I had a minor issue with the brakes, and they resolved it within 24 hours. This level of support is rare these days. The bike rides like a dream—smooth, silent, and stylish.",
    rating: 5,
    location: "Lahore, Pakistan",
    date: "2025-02-10",
  },
  {
    id: 4,
    name: "Sophia Lee",
    image: "https://i.pravatar.cc/150?img=9",
    comment:
      "Stylish and reliable bikes. Couldn’t ask for more. I've tried multiple brands before, but this one stands out. The attention to detail, the durability, and the ease of use make it a clear winner in my book. I’ve already recommended it to all my friends.",
    rating: 4,
    location: "Seoul, South Korea",
    date: "2025-03-22",
  },
];

export default function Testimonial() {
  const [groupSize, setGroupSize] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Set group size based on screen width
  useEffect(() => {
    const updateGroupSize = () => {
      setGroupSize(window.innerWidth >= 768 ? 2 : 1); // lg: 1024px+
    };

    updateGroupSize(); // Initial check
    window.addEventListener("resize", updateGroupSize);
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  const totalGroups = Math.ceil(testimonials.length / groupSize);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalGroups);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, totalGroups]);

  const groupedTestimonials = useMemo(() => {
    const groups = [];
    for (let i = 0; i < testimonials.length; i += groupSize) {
      groups.push(testimonials.slice(i, i + groupSize));
    }
    return groups;
  }, [groupSize]);

  return (
    <div
      className="w-[92%] mx-auto mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold font-mono mb-10 text-center border-b-4 border-primary inline-block">
          What Our Riders Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groupedTestimonials[currentIndex]?.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-base-100 w-full shadow-xl p-6 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="col-span-1 flex">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-32 h-32 object-cover rounded-md ring ring-secondary ring-offset-2"
                />
              </div>

              {/* Content */}
              <div className="col-span-3 space-y-1">
                <h4 className="text-lg font-semibold text-secondary">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-xs text-gray-400 mb-2">{testimonial.date}</p>

                <div className="rating rating-sm mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-500"
                      checked={testimonial.rating === i + 1}
                      readOnly
                    />
                  ))}
                </div>

                <div className="italic text-gray-700 text-justify flex items-start gap-2">
                  <FaQuoteLeft className="text-secondary text-2xl mt-1 shrink-0" />
                  <p className="text-sm">{testimonial.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {groupedTestimonials?.map((_, index) => (
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
