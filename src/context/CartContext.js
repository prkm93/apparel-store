import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

import { initialCartState, cartReducer } from "../reducers/cartReducer";
import {
  getCartService,
  addToCartService,
  removeFromCartService,
  updateCartQuantityService,
} from "../services/cart/cartService";
import { cartActionTypes } from "../utils/constant";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const { IS_LOADING_CART, GET_CART, ADD_TO_CART, REMOVE_FROM_CART } =
    cartActionTypes;
  const token = JSON.parse(localStorage.getItem("userInfo"))?.encodedToken;

  const handleCartLoader = (booleanVal) => {
    cartDispatch({
      type: IS_LOADING_CART,
      payload: booleanVal,
    });
  };

  const getCartList = async () => {
    try {
      const {
        status,
        data: { cart },
      } = await getCartService(token);

      if (status === 200) {
        cartDispatch({
          type: GET_CART,
          payload: cart,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addtoCartHandler = async (product, token) => {
    handleCartLoader(true);
    try {
      const response = await addToCartService(product, token);
      console.log("response add cart ===>", response);
      cartDispatch({
        type: ADD_TO_CART,
        payload: response.data.cart,
      });
      toast.success(`${product.title} added to cart 🛒`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
    }
    handleCartLoader(false);
  };

  useEffect(() => {
    if (token) {
      getCartList();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{ cartState, cartDispatch, addtoCartHandler, handleCartLoader }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartContext, CartProvider, useCart };
