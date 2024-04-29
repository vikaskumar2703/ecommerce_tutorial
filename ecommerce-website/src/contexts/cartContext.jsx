import { createContext } from "react";
import { useContext, useState, useEffect } from "react";

export const CartContext = createContext();
// you can provide with default contetxt within create context or explicitly create using "value

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//function for using created context
export default function useCart() {
  return useContext(CartContext);
}
