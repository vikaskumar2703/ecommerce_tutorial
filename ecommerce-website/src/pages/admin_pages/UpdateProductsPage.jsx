import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";
import { Select } from "antd";

export default function CreateProductsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/get-product/${
          params.slug
        }`
      );
      setName(data.product.name);
      setDesc(data.product.description);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setShipping(data.product.shipping);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", desc);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      const res = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/products/update-product/${id}`,
        productData
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product"
      );
      if (!answer) return;
      console.log(id);
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/products/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting product");
    }
  };
  return (
    <Layout title="Create Products">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <AdminMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            Update products
          </h1>
          <form
            className="register-form flex flex-col space-y-4 w-full"
            onSubmit={handleSubmit}
          >
            <Select
              placeholder="Select a category"
              size="large"
              value={category}
              showSearch
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
            <label className="border bg-blue-600 text-white rounded">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="images/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              ></input>
            </label>
            <div className="image-preview">
              {photo ? (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    className="h-[200px]"
                  ></img>
                </div>
              ) : (
                <div>
                  <img
                    src={`${
                      import.meta.env.VITE_REACT_APP_API
                    }/api/products/product-photo/${id}`}
                    alt="product-photo"
                    className="h-[200px]"
                  ></img>
                </div>
              )}
            </div>
            <input
              value={name}
              className="border"
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              name="name"
              placeholder="Write Product Name"
            ></input>
            <input
              value={desc}
              className="border"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              id="desc"
              name="desc"
              placeholder="Write a description"
            ></input>
            <input
              value={price}
              className="border"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Write a Price"
            ></input>
            <input
              value={quantity}
              className="border"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              id="quantity"
              placeholder="Enter the stock quantity."
            ></input>
            <Select
              placeholder="Select shipping"
              size="large"
              value={shipping ? "Yes" : "No"}
              onChange={(value) => setShipping(value)}
            >
              <Select.Option value="1">Yes</Select.Option>
              <Select.Option value="0">No</Select.Option>
            </Select>
            <button
              type="submit"
              className="border rounded bg-blue-600 w-52 py-2 text-white"
            >
              Update Product
            </button>
          </form>{" "}
          <button
            className="border-2 bg-red-600 rounded w-52 py-2 text-white"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </div>
    </Layout>
  );
}
