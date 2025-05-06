import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { applyCoupon, clearCart } from "../../redux/features/cart/CartSlice";
import { RootState } from "../../redux/features/store";

type CouponType = {
  coupon: string;
};

export default function OrderSummary() {
  const { register, handleSubmit } = useForm<CouponType>();
  const { totalAmount, totalItems, shippingCost, tax, discount, grandTotal, appliedCoupon } = useSelector(
    (state: RootState) => state.cart
  );
  const [enteredCoupon, setEnteredCoupon] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CouponType> = (data) => {
    setEnteredCoupon(data.coupon);
    dispatch(applyCoupon(data.coupon));
  };

  useEffect(() => {
    if (enteredCoupon !== null) {
      if (appliedCoupon === enteredCoupon) {
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid or expired coupon!");
      }
    }
  }, [appliedCoupon, enteredCoupon]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCoupon = () => {
    dispatch(applyCoupon(null));
  };

  return (
    <div className="cart-summary p-5 rounded-md shadow-lg">
      <h2 className="text-center font-serif text-2xl font-medium">Order Summary</h2>
      <hr className="h-[2px] bg-gray-600 my-2" />
      <div className="w-10/12 mx-auto font-mono">
        <div>
          <p className="flex justify-between">
            <span className="font-bold text-lg">Total items:</span> {totalItems}
          </p>
          <p className="flex justify-between">
            <span className="font-bold text-lg">Subtotal:</span> ${totalAmount.toFixed(2)}
          </p>
          <p className="flex justify-between">
            <span className="font-bold text-lg">Shipping:</span> ${shippingCost.toFixed(2)}
          </p>
          <p className="flex justify-between">
            <span className="font-bold text-lg">Tax:</span> ${tax.toFixed(2)}
          </p>

          {/* Responsive Coupon Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="w-full py-1 px-2 focus:outline-none border rounded"
              type="text"
              value="SAVE20"
              placeholder="Enter Coupon"
              {...register("coupon")}
            />
            <button
              className="w-full bg-primary hover:bg-primary/80 px-3 py-1 text-white rounded cursor-pointer hover:bg-primary-dark"
              type="submit"
            >
              Apply
            </button>
          </form>

          {appliedCoupon && discount > 0 && (
            <p className="flex justify-between">
              <span className="font-bold text-lg">
                Saved:{" "}
                <span className="text-xs">
                  ({appliedCoupon})
                  <sup
                    onClick={handleRemoveCoupon}
                    className="text-sm hover:text-red-500 cursor-pointer"
                  >
                    x
                  </sup>
                </span>
              </span>{" "}
              ${discount.toFixed(2)}
            </p>
          )}

          <hr className="h-[2px] bg-gray-600 my-2" />
          <p className="flex justify-between">
            <span className="font-bold text-lg">Grand Total:</span> ${grandTotal}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center my-5 gap-3">
          <button
            onClick={() => {
              const modal = document.getElementById("clear-cart-modal") as HTMLDialogElement;
              modal?.showModal();
            }}
            className="w-full sm:w-7/12 bg-red-500 hover:bg-red-600 py-2 text-white font-bold rounded"
          >
            Clear cart
          </button>
          <dialog id="clear-cart-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are You Sure to clear cart items?</h3>
              <p className="py-4">This action could not be undone!</p>
              <div className="modal-action">
                <form className="flex gap-5" method="dialog">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button className="px-3 py-1 bg-gray-300 hover:bg-gray-200">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <Link
            className="w-full sm:w-7/12 bg-secondary/80 hover:bg-secondary text-center py-2 text-white font-bold rounded"
            to="/checkout"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}