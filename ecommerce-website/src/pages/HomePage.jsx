import Layout from "../components/layout/Layout";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import useCart from "../contexts/cartContext";
import { Prices } from "../components/Prices";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [cart, setCart] = useCart();
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

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
    getTotal();
  }, []);

  // get total products count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Loadmore products function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title="Ecommerce Site">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <h1 className="m-2 font-bold text-xl">Filter By Category</h1>
          <div className="m-4 flex flex-col">
            {" "}
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Filter by price */}
          <h1 className="m-2 font-bold text-xl">Filter By Price</h1>
          <div className="m-4 flex flex-col">
            {" "}
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button
            className="bg-red-600 p-2 text-white m-2 rounded"
            onClick={() => {
              window.location.reload();
            }}
          >
            RESET FILTERS
          </button>
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md"> All Products</h1>
          {/* Products Grid */}
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
          <div>
            {products && products.length < total && (
              <button
                className="btn -loadmore bg-blue-500 rounded-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1);
                }}
              >
                {loading ? "Loading..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
