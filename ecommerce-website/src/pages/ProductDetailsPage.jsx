import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params.slug]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product.category._id, data?.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/products/similar-products/${cid}/${pid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Product Details">
      <div className="flex flex-col">
        <div>
          {" "}
          <h1>{JSON.stringify(product, null, 4)}</h1>
          <button className="bg-blue-600 p-2 w-fit text-white rounded">
            Add to cart
          </button>
        </div>
        <br></br>
        <div>
          <h1 className="font-bold text-xl">Similar Products</h1>

          {similarProducts.length < 1 && <p> No similar products found</p>}
          <p>{JSON.stringify(similarProducts, null, 4)}</p>
        </div>
      </div>
    </Layout>
  );
}
