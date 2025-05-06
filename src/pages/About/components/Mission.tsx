import { FaGlobe, FaHandshake, FaLeaf, FaUsers } from "react-icons/fa";

export default function Mission() {
  const valuesData = [
    {
      icon: <FaGlobe />,
      title: "Sustainability",
      description:
        "We prioritize eco-friendly production and sustainable practices.",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "We build a community of passionate riders and enthusiasts.",
    },
    {
      icon: <FaHandshake />,
      title: "Integrity",
      description: "Honesty and transparency guide everything we do.",
    },
    {
      icon: <FaLeaf />,
      title: "Innovation",
      description:
        "We constantly push the boundaries of bike technology and design.",
    },
  ];

  return (
    <section className="w-[90%] mx-auto my-16">
      <div className="">
        <div className="text-center mb-12 flex justify-center">
          <h2 className="text-4xl font-mono border-b-4 border-primary w-fit pb-1">
            Our Mission & Values 🌍
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {valuesData.map((value, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="text-blue-500 text-4xl mb-3 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
