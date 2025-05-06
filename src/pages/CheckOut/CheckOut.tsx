import { useDispatch, useSelector } from "react-redux";
import { useGetUserByEmailQuery } from "../../redux/features/users/usersApi";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/features/cart/CartSlice";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useForm } from "react-hook-form";
import { CheckOutSkeleton } from "./CheckOutSkeleton";
import { RootState } from "../../redux/features/store";
import { APIErrorType } from "../../interfaces/interfaces";
import img from "../../assets/svg/checkout.svg";

type cartItemType = {
  _id: string;
  cart_quantity: number;
  name: string;
  price: number;
};

type OrderFormDataType = {
  address: string;
  phone: string;
  name: string;
  email: string;
};

export default function CheckOut() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { totalAmount, shippingCost, tax, discount, grandTotal } = useSelector(
    (state: RootState) => state?.cart
  );

  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByEmailQuery(loggedInUser?.user ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormDataType>();

  if (isLoading) return <CheckOutSkeleton />;
  if (error) return toast.error("Error loading user data");

  const onSubmit = async (data: OrderFormDataType) => {
    if (!data.address || !data.phone) {
      toast.error("Please fill in all details!");
      return;
    }

    const orderData = {
      customer: user.data._id,
      address: data.address,
      phone: data.phone,
      items: cartItems.map((item) => ({
        product: item._id,
        order_quantity: item.cart_quantity,
      })),
      totalAmount: grandTotal,
    };

    try {
      const res = await createOrder(orderData).unwrap();
      const url = res.data;
      if (!res?.error) {
        setTimeout(() => {
          window.location.href = url;
        }, 100);
        dispatch(clearCart());
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as APIErrorType)?.data?.message || "Failed to place order.";
      toast.error(errorMessage);
    }
  };

  const inputFields = [
    {
      name: "name",
      placeholder: "Enter your Name",
      defaultValue: user.data.user_name,
      disabled: false,
      required: false,
    },
    {
      name: "email",
      placeholder: "",
      defaultValue: user.data.email,
      disabled: true,
      required: false,
    },
    {
      name: "address",
      placeholder: "Enter Address",
      defaultValue: "",
      disabled: false,
      required: true,
    },
    {
      name: "phone",
      placeholder: "Enter Phone Number",
      defaultValue: "",
      disabled: false,
      required: true,
    },
  ] as const;

  return (
    <div className="w-[91%] mx-auto min-h-[70vh] flex-row-reverse lg:flex justify-between">
      <div className="lg:w-1/2 mt-5 lg:mt-20">
        <div className="shadow-md rounded-md p-5">
          <div className="flex justify-center">
            <h2 className="text-center font-mono text-3xl font-bold mb-6 border-b-4 px-2 border-primary w-fit">
              Checkout
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid xl:grid-cols-2 gap-6"
          >
            {/* Order Summary */}
            <div className="border p-4 rounded-md space-y-2">
              <h3 className="text-xl font-semibold border-b pb-2">
                Order Summary
              </h3>

              {cartItems.map((item: cartItemType) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b py-2"
                >
                  <p>
                    {item.name} (x{item.cart_quantity})
                  </p>
                  <p>${(item.price * item.cart_quantity).toFixed(2)}</p>
                </div>
              ))}

              {[
                { label: "Subtotal", value: totalAmount },
                { label: "Tax", value: tax },
                { label: "Shipping", value: shippingCost },
                { label: "Discount", value: discount },
              ].map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between ${
                    entry.label === "Discount" ? "border-b pb-2" : ""
                  }`}
                >
                  <span>{entry.label}:</span>
                  <span>${entry.value}</span>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total:</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            {/* User Info Form */}
            <div className="space-y-4">
              {inputFields.map((field) => (
                <input
                  key={field.name}
                  type={field.name === "email" ? "email" : "text"}
                  {...register(field.name, {
                    required: field.required,
                  })}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  disabled={field.disabled}
                  className={`${
                    errors[field.name] && "border-red-500 focus:outline-red-500"
                  } w-full border p-3 rounded ${
                    field.disabled ? "bg-gray-100" : "bg-transparent"
                  }`}
                />
              ))}

              <button
                type="submit"
                className="px-8 w-full py-3 bg-primary hover:bg-primary/80 text-white rounded shadow-lg transition duration-200"
              >
                Order Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="lg:w-1/2">
        <img className="w-[90%] mx-auto" src={img} alt="Checkout Illustration" />
      </div>
    </div>
  );
}
