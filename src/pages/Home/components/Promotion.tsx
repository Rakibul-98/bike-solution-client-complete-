import { Link } from "react-router-dom";
import Tilt from 'react-parallax-tilt';

const promotions = [
  {
    title: "New Year Sale",
    description: "Get up to 30% OFF on all mountain bikes!",
    buttonText: "Shop Now",
    bgGradient: "from-[#0033ff] via-[#0099ff] to-[#00ffff]",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
  },
  {
    title: "Flash Deal",
    description: "Buy 1 Get 1 Free on all accessories!",
    buttonText: "Claim Offer",
    bgGradient: "from-purple-700 via-indigo-500 to-pink-400",
    buttonBg: "bg-pink-500",
    buttonHover: "hover:bg-pink-600",
  },
  {
    title: "Membership Discount",
    description: "Join our VIP Club & get 20% OFF on your first order.",
    buttonText: "Join Now",
    bgGradient: "from-[#ff007f] via-[#ff4f00] to-[#ffd500]",
    buttonBg: "bg-red-700",
    buttonHover: "hover:bg-red-900",
  },
];

export default function Promotion() {
  return (
    <div className="mt-16 w-[92%] mx-auto">
      <div
        className="relative bg-no-repeat bg-cover lg:bg-center h-64 rounded-lg overflow-hidden flex items-center justify-center lg:justify-end text-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/20Gsp38b/sale.jpg')",
        }}
      >
        <h1 className="text-4xl font-bold text-white z-10 me-10">
          Limited-Time Offers! Up to{" "}
          <span className="text-yellow-400">50% OFF</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 text-white">
        {promotions.map((promo, idx) => (
          <Tilt key={idx}>
            <div
              className={`bg-gradient-to-r ${promo.bgGradient} shadow-lg rounded-lg p-6 text-center hover:bg-gradient-to-bl`}
            >
              <h2 className="text-2xl font-semibold">{promo.title}</h2>
              <p className="mt-2 mb-5">{promo.description}</p>
              <Link
                to="/products"
                className={`${promo.buttonBg} text-white px-6 py-2 rounded-lg ${promo.buttonHover}`}
              >
                {promo.buttonText}
              </Link>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
