import { useMemo } from "react";
import { ItemType } from "../../interfaces/interfaces";
import AddToCartButton from "../Shared/NavBar/AddToCartButton";
import BikeSpecification from "./BikeSpecification";
import BuyingGuide from "./BuyingGuide";

export default function DetailsCard({
  productData,
}: {
  productData: ItemType;
}) {
  const {
    available_quantity,
    brand,
    category,
    // description,
    // features,
    inStock,
    name,
    price,
    product_image,
  } = productData;


  const fakePrice = useMemo(() => price * 1.3, [price]);
  const discountPercentage = useMemo(
    () => Math.ceil(100 - (price / fakePrice) * 100),
    [price, fakePrice]
  );

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-10 ">
        <div className="md:w-[70%]">
          <img
            className="h-[400px] w-full object-cover"
            src={product_image}
            alt={name}
          />
          <BikeSpecification/>
        </div>
        <div className=" lg:w-[30%] ">
          <div className="space-y-3 bg-base-100 rounded-lg shadow-xl h-fit p-5">
            <h2 className="text-4xl font-semibold font-mono">{name}</h2>
            <div className="flex gap-5 items-center">
              <div className="rating rating-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-secondary"
                  />
                ))}
              </div>
              <p>(200 Reviews)</p>
            </div>
            <div className="flex gap-5 my-5 items-center">
              <p className="font-semibold text-xl">
                Price:{" "}
                <span className="text-red-500 font-medium ">${price}</span>
              </p>
              <p className="line-through">${fakePrice}</p>
              <p className="bg-red-500 py-1 px-[6px] text-xs text-white">
                -{discountPercentage}%
              </p>
            </div>

            <div className="flex justify-between">
              <p>
                <span className="font-semibold font-serif">Brand:</span> {brand}
              </p>
              <p>
                <span className="font-semibold font-serif">Category:</span>{" "}
                {category}
              </p>
            </div>
            <p>
              <span className="font-semibold font-serif">In-Stock:</span>{" "}
              <span
                className={`badge text-base-100 badge-lg ${
                  inStock ? "badge-success" : "badge-error"
                }`}
              >
                {inStock ? "Available" : "Out of stock"}
              </span>
            </p>
            <p>
              <span className="font-semibold font-serif">
                Available Quantity:
              </span>{" "}
              {available_quantity}
            </p>

            <AddToCartButton product={productData} />
          </div>
          <BuyingGuide/>
        </div>
      </div>
      
    </div>
  );
}
