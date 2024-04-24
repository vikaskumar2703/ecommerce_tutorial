import Layout from "../components/layout/Layout";
import { Checkbox } from "antd";
import useAuth from "../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // get all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/category/get-category`
      );
      if (res && res.data.success) {
        const { data } = res;
        setCategories(data.category);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title="Ecommerce Site">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <h1 className="m-2 font-bold text-xl">Filters</h1>
          <div className="m-4">
            {categories.map((c) => (
              <Checkbox key={c._id} value={c._id}>
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md"> All Products</h1>
          <div className="grid grid-cols-3 ">
            {products.map((p) => (
              // <Link to={`/dashboard/admin/products/${p.slug}`}>
              <div className="border" key={p._id}>
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_API
                  }/api/products/product-photo/${p._id}`}
                  className="min-h-[200px]"
                  alt="product-photo"
                />
                <div className="flex flex-col items-start m-2">
                  <h1 className="font-bold text-lg">{p.name}</h1>
                  <p>{p.description}</p>
                  <div className="w-full flex justify-start m-2">
                    <button className="border bg-blue-600 text-white py-2 px-2 ml-2 rounded">
                      More Details
                    </button>
                    <button className="border bg-blue-600 text-white py-2 px-2 ml-2 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
