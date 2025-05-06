import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RootState } from "../redux/features/store";
import { ItemType } from "../interfaces/interfaces";
import { addToCart } from "../redux/features/cart/CartSlice";

const selectCartItems = (state: RootState) => state.cart.items;
const memoizedCartItems = createSelector([selectCartItems], (items) =>
  Array.isArray(items) ? items : []
);

export default function useAddToCart(product: ItemType) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [isLimitExceed, setIsLimitExceed] = useState(false);
  
  const cartItems = useSelector(memoizedCartItems);
  const cartItem = cartItems.find((item) => item._id === product._id);
  const cartQuantity = cartItem?.cart_quantity || 0;

  useEffect(() => {
    setIsLimitExceed(cartQuantity + 1 > product.available_quantity);
  }, [cartQuantity, product.available_quantity]);

  const handleAddToCart = () => {
    if (!isLimitExceed) {
      dispatch(addToCart(product));
      setAdded(true);
      toast.success("Added to cart successfully!");
      setTimeout(() => setAdded(false), 1500);
    } else {
      toast.error("You cannot add more than the available quantity.");
    }
  };

  return {
    added,
    isLimitExceed,
    inStock: product.inStock,
    handleAddToCart,
    cartQuantity
  };
}