import { AdminMenu } from "../../components/layout/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { Button, Modal } from "antd";

export default function CreateCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState({});

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/category/get-category`
      );
      if (res && res.data.success) {
        const { data } = res;
        toast.success(data.message);

        setCategories(data.category);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //adding category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/category/create-category`,
        {
          name,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setName("");
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (res && res.data.success) {
        const { data } = res;
        toast.success(data.message);
        setIsModalOpen(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteCategory = async (pid) => {
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/api/category/delete-category/${pid}`
      );
      if (res && res.data.success) {
        const { data } = res;
        toast.success(data.message);
        getAllCategories();
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
    <Layout title="Create Category">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <AdminMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-start">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            Manage Category
          </h1>
          <form onSubmit={handleSubmit} className="category-form m-4">
            <input
              className="border h-10 m-4 p-2 rounded"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              placeholder="Enter new category"
            ></input>
            <button
              type="submit"
              className="bg-blue-600 h-10 text-white px-2 py-1 rounded mr-2"
            >
              Submit
            </button>
          </form>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-96">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={c._id}
                  >
                    <td className="px-6 py-4" key={c._id}>
                      {c.name}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => {
                          console.log(c.name);
                          deleteCategory(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <form onSubmit={updateCategory} className="category-form m-4">
              <input
                className="border h-10 m-4 p-2 rounded"
                value={updatedName}
                onChange={(e) => {
                  setUpdatedName(e.target.value);
                }}
                id="name"
              ></input>
              <button
                type="submit"
                className="bg-blue-600 h-10 text-white px-2 py-1 rounded mr-2"
              >
                Submit
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
