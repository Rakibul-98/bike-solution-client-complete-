import { BsCartPlus, BsCheck, BsExclamationTriangle } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/features/store";
import { useGetUserByEmailQuery } from "../../../redux/features/users/usersApi";
import useAddToCart from "../../../util/AddToCart";
import { ItemType } from "../../../interfaces/interfaces";

interface AddToCartButtonProps {
  product: ItemType;
  className?: string;
}

export default function AddToCartButton({
  product,
  className = "",
}: AddToCartButtonProps) {
  const location = useLocation();
  const loggedInUser = useSelector((state: RootState) => state?.auth?.user);
  const { data: user } = useGetUserByEmailQuery(loggedInUser?.user || "");

  const { added, isLimitExceed, inStock, handleAddToCart } =
    useAddToCart(product);

  if (loggedInUser?.role === "customer" && !user?.data?.isBlocked) {
    return (
      <button
        onClick={handleAddToCart}
        disabled={!inStock || isLimitExceed}
        className={`flex items-center justify-center gap-2 px-5 py-[6px] ${
          !inStock || isLimitExceed
            ? "bg-gray-400 cursor-not-allowed"
            : added
            ? "bg-secondary"
            : "bg-primary/90 hover:bg-primary"
        } text-base-100 font-semibold rounded-md shadow-md transition-all duration-300`}
      >
        {!inStock || isLimitExceed ? (
          <>
            <BsExclamationTriangle className="text-lg" /> Out of Stock
          </>
        ) : added ? (
          <>
            <BsCheck className="text-lg" /> Added
          </>
        ) : (
          <>
            <BsCartPlus className="text-lg" /> Add to Cart
          </>
        )}
      </button>
    );
  }

  return (
    <Link
      to="/login"
      state={{ from: location.pathname }}
      className={`flex items-center justify-center gap-2 px-5 py-[6px] font-semibold rounded-md shadow-lg border bg-neutral hover:bg-base-100 w-fit mb-2 ${className}`}
    >
      {user?.data?.isBlocked
        ? "User Blocked"
        : "Login as customer to buy product"}
    </Link>
  );
}
