import axios from "axios";
import useSearch from "../contexts/searchContext";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
  const [values, setValues] = useSearch();
  // console.log(values);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/products/search-product/${
          values.keyword
        }`
      );
      setValues({ ...values, results: data });

      navigate(`/search`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form ">
      <input
        className="border p-2 rounded"
        type="search"
        value={values.keyword}
        onChange={(e) => {
          setValues({ ...values, keyword: e.target.value });
        }}
        id="search"
        placeholder="Search"
      ></input>
      <button
        type="submit"
        className="bg-blue-600 h-10 text-white px-2 py-1 rounded mr-2"
      >
        Search
      </button>
    </form>
  );
};
