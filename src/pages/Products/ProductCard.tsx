import { useNavigate } from "react-router-dom";
import { ItemType } from "../../interfaces/interfaces";
import Tilt from "react-parallax-tilt";
import AddToCartButton from "../Shared/NavBar/AddToCartButton";

export default function ProductCard({ product }: { product: ItemType }) {
  const { _id, brand, category, description, name, price, product_image } =
    product;
  const navigate = useNavigate();

  const handleShowDetails = (id: string) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <Tilt>
      <div
        className=" group"
      >
        <div className="card bg-base-100 shadow-md group-hover:shadow-xl rounded-md overflow-hidden flex flex-col h-full hover:scale-105">
          <div className="badge absolute top-2 right-2 badge-primary text-base-100">
            NEW
          </div>

          <figure className="w-full h-40 relative">
            <img
              className="w-full h-full object-cover transition-all duration-500"
              src={product_image}
              alt={name}
            />
            <p onClick={() => handleShowDetails(_id)} className="cursor-pointer opacity-0 group-hover:opacity-100 absolute -bottom-[2px] transition-opacity duration-500 bg-primary w-full text-center py-2 font-medium">Show Details</p>
          </figure>

          <div className="card-body p-2 flex flex-col flex-grow">
            <h2 className="text-lg font-semibold flex justify-between text-secondary">
              {name}
              <div className="badge badge-link">{category}</div>
            </h2>
            <p className="text-sm">
              <span className="font-semibold">Brand:</span> {brand}
            </p>
            <p className="text-sm  overflow-hidden whitespace-nowrap text-ellipsis">
              {description}
            </p>

            <div className="font-semibold">
              Price: <span className="text-xs text-secondary">$ {price.toFixed(2)}</span>
            </div>
            <AddToCartButton className="hidden" product={product}/>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
