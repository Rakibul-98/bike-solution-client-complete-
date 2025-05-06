import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const ratingBreakdown = {
  5: 150,
  4: 50,
  3: 20,
  2: 10,
  1: 5,
};

const dummyBikeData = {
  name: "X-Trail 500 Pro",
  brand: "TrailMaster",
  category: "Mountain Bike",
  price: 899.99,
  fakePrice: 1199.99,
  discountPercentage: 25,
  available_quantity: 18,
  inStock: true,
  description:
    "The X-Trail 500 Pro is designed for rugged trails and urban roads alike. With a lightweight aluminum frame, hydraulic disc brakes, and 21-speed Shimano gear system, it delivers performance, durability, and style.",
  features: [
    "Hydraulic disc brakes for superior stopping power",
    "Lightweight yet sturdy aluminum frame",
    "Shock-absorbing front suspension",
    "Ergonomic saddle and handlebar grips",
    "Shimano 21-speed gear system",
    "Reflective tire walls for better night visibility",
  ],
  specifications: {
    frame: "Aluminum Alloy 6061",
    brakes: "Hydraulic Disc Brakes",
    gears: "Shimano 21-speed",
    weight: "13.5 kg",
    suspension: "Front Suspension Fork (Lockable)",
    wheelSize: "27.5 inches",
    tireType: "All-Terrain",
    battery: "None (manual bike)",
  },
  ratingStats: {
    average: 4.3,
    totalReviews: 235,
    breakdown: ratingBreakdown,
  },
};

export default function BikeSpecification() {
  const tabs = ["Details", "Specifications", "Ratings"];
  const [activeTab, setActiveTab] = useState("Details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return (
          <>
            <p className="text-gray-700 text-justify">
              {dummyBikeData.description}
            </p>
            <ul className="list-disc list-inside mt-4 space-y-1 text-gray-700">
              {dummyBikeData.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </>
        );
      case "Specifications":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {Object.entries(dummyBikeData.specifications).map(
              ([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>{" "}
                  {value}
                </div>
              )
            )}
          </div>
        );
      case "Ratings":
        return (
          <div className="text-gray-700">
            <div className="flex items-center mb-4">
              <span className="text-4xl font-bold text-yellow-500">
                {dummyBikeData.ratingStats.average.toFixed(1)}
              </span>
              <div className="ml-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < Math.round(dummyBikeData.ratingStats.average)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm">
                  {dummyBikeData.ratingStats.totalReviews} reviews
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {([5, 4, 3, 2, 1] as const).map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-6">{star}⭐</span>
                  <div className="bg-gray-200 h-3 rounded-full w-full">
                    <div
                      className="bg-yellow-400 h-3 rounded-full"
                      style={{
                        width: `${
                          (dummyBikeData.ratingStats.breakdown[star] /
                            dummyBikeData.ratingStats.totalReviews) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm w-10 text-right">
                    {dummyBikeData.ratingStats.breakdown[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" bg-base-100 p-6 shadow-md mt-8 rounded-md">
      <div className="mb-6 border-b flex gap-6 text-sm font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-xl font-mono ${
              activeTab === tab
                ? "border-b-4 border-primary text-primary"
                : " hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[200px] animate-fade-in">{renderTabContent()}</div>
    </div>
  );
}