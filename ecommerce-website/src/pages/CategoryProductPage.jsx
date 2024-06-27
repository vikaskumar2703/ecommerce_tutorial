import Layout from "../components/layout/Layout";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useCart from "../contexts/cartContext";

export default function CategoryProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getCategoryProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/category-products/${
          params.slug
        }`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getCategoryProducts();
  }, [params.slug]);

  return (
    <Layout title="Categories">
      <div>
        <h1 className="text-xl text-center m-4 font-bold">Category Products</h1>
        <div className="grid grid-cols-3 gap-4 ">
          {products.map((p) => (
            // Product Card
            <div className="border p-4" key={p._id}>
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/api/products/product-photo/${p._id}`}
                className="h-[200px]"
                alt="product-photo"
              />
              <div className="flex flex-col items-start m-2">
                <h1 className="font-bold text-lg">{p.name}</h1>
                <p>{p.description.substring(0, 30)}</p>
                <p>${p.price}</p>
                <div className="w-full flex justify-start m-2">
                  <button
                    className="border bg-blue-600 text-white py-2 px-2 ml-2 rounded"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="border bg-blue-600 text-white py-2 px-2 ml-2 rounded"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added successfully to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
