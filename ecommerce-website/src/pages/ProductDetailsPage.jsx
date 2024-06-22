import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

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
        <div className=" flex gap-28 justify-start m-10 ">
          <div className="img-container flex ">
            {product && (
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API
                }/api/products/product-photo/${product?._id}`}
                className="h-[300px]"
                alt="product-photo"
              />
            )}
          </div>
          <div className="space-y-10 p-6 ">
            <div className="desc space-y-4 ">
              <h1>{product?.name}</h1>
              <p>{product?.description}</p>
              <p>Price: ${product?.price}</p>
            </div>

            <button className="bg-blue-600 p-2 w-fit text-white rounded">
              Add to cart
            </button>
          </div>
        </div>
        <br></br>
        <div className="mb-10">
          <h1 className="font-bold text-xl my-10">Similar Products</h1>

          {similarProducts.length < 1 && <p> No similar products found</p>}
          {similarProducts.map((p) => (
            // <Link to={`/dashboard/admin/products/${p.slug}`}>
            <div className="border w-fit p-4" key={p._id}>
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
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
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
