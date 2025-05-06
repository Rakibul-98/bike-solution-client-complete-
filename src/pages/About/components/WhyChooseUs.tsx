import { FaBiking, FaShippingFast, FaStar, FaTools } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaBiking />,
      title: "Premium Bikes",
      description:
        "Top-quality bikes designed for performance, comfort, and durability.",
    },
    {
      icon: <FaTools />,
      title: "Expert Support",
      description:
        "Our professionals provide expert guidance and maintenance tips.",
    },
    {
      icon: <FaStar />,
      title: "Customer Satisfaction",
      description: "Rated 5 stars by thousands of happy riders worldwide.",
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      description:
        "Get your dream bike delivered to your doorstep quickly and safely.",
    },
  ];

  return (
    <section className="w-[90%] mx-auto my-16">
      <div className="text-center">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 font-mono border-b-4 border-primary w-fit pb-1">
            Why Choose Us?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <Tilt>
              <div
                key={index}
                className=" shadow-lg rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-blue-500 text-5xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
