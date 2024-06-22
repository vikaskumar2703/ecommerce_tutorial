import { UserMenu } from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import useAuth from "../../contexts/authContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/orders`
      );
      setOrders(data);
      toast.success("Orders listed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title="User Orders">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <UserMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            Your Orders
          </h1>
          {orders?.map((o, i) => {
            return (
              <div className="border w-full my-4 " key={o._id}>
                <table className="table-auto w-full">
                  <thead>
                    <tr className="border border-collapse h-10">
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-10">
                      <td>{i + 1}</td>
                      <td>{o.status}</td>
                      <td>{o.buyer.name}</td>
                      <td></td>
                      <td>{o.payment.success ? "Success" : "Pending"}</td>
                      <td>{o.products.length}</td>
                    </tr>
                  </tbody>
                </table>
                {o?.products.map((p) => {
                  return (
                    <div className=" flex justify-around p-4 " key={p._id}>
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
                        <p>${p.price}</p>{" "}
                      </div>
                    </div>
                  );
                })}
                ;
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
