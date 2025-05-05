import { TiShoppingCart } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { ItemType } from "../../../interfaces/interfaces";

type CartItemPropType = {
    cartItems: ItemType[];
}

const CartIcon = ({ cartItems }: CartItemPropType) => (
    
    <div className="indicator">
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "text-secondary font-semibold" : "hover:text-secondary"
        }
      >
        <TiShoppingCart className="text-3xl" />
      </NavLink>
      {cartItems.length > 0 && (
        <span className="absolute h-3 w-3 -right-[5px] -top-[5px] bg-accent rounded-full"></span>
      )}
    </div>
  );

  export default CartIcon;