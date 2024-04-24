import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/get-product`
      );
      if (data.success) {
        setProducts(data.products);
        toast.success(data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title="Create Products">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <AdminMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            {" "}
            Products
          </h1>
          <div className="grid grid-cols-3 ">
            {products.map((p) => (
              <Link to={`/dashboard/admin/products/${p.slug}`}>
                <div className="border" key={p._id}>
                  <img
                    src={`${
                      import.meta.env.VITE_REACT_APP_API
                    }/api/products/product-photo/${p._id}`}
                    className="min-h-[200px]"
                    alt="product-photo"
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="font-bold text-lg">{p.name}</h1>
                    <p>{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
