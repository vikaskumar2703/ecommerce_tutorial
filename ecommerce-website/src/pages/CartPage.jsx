import Layout from "../components/layout/Layout";
import useCart from "../contexts/cartContext";
import useAuth from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let cartArr = [...cart];
      let index = cartArr.findIndex((product) => product._id === pid);
      cartArr.splice(index, 1);
      setCart(cartArr);
      localStorage.setItem("cart", JSON.stringify(cartArr));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = (CartArr) => {
    let total = CartArr.reduce((total, obj) => total + obj.price, 0);
    return total;
  };

  let total = getTotal(cart);
  return (
    <Layout title="Cart">
      <div className="grid  grid-cols-4 grid-rows-1 w-full min-h-screen justify-items-center ">
        <div className="flex flex-col col-span-2 items-center border">
          <h1 className="text-xl">Your Cart</h1>
          <p>
            {cart.length < 1
              ? "Your Cart is empty"
              : `Your cart has ${cart.length} items`}
          </p>
          <p>{auth?.token ? "" : "Please Login to Checkout "}</p>
          {cart.map((p) => (
            // <Link to={`/dashboard/admin/products/${p.slug}`}>
            <div className="border " key={cart.indexOf(p)}>
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/api/products/product-photo/${p._id}`}
                className="h-[200px]"
                alt="product-photo"
              />
              <div className="flex flex-col items-start m-2">
                <h1 className="font-bold text-lg">{p.name}</h1>
                <p>{p.description}</p>
                <p>${p.price}</p>
                <div className="w-full flex justify-start m-2">
                  <button
                    className="border bg-blue-600 text-white py-2 px-2 ml-2 rounded"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            // </Link>
          ))}
        </div>
        <div className="flex flex-col col-span-2 items-center ml-2 space-y-4">
          <h1 className="font-bold text-xl"> Cart Summary </h1>
          <p>TOtal | Checkout | Payment </p>

          <h1> Total : {total} </h1>
          {auth?.token ? (
            <>
              <div>
                <h1> Current Address : {auth.user.address} </h1>
              </div>
              {total > 0 ? (
                <div className="checkout">Payment Gateway here</div>
              ) : (
                ""
              )}
            </>
          ) : (
            <button className="border-2 border-blue-200 p-2 rounded">
              Please Login to checkout
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
