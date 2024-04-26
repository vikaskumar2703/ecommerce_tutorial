import Layout from "../components/layout/Layout";
import useSearch from "../contexts/searchContext";

export default function SearchPage() {
  const [values, setValues] = useSearch();

  return (
    <Layout title="Search page">
      <div className="min-h-full">
        <h1 className="text-center font-bold">Search Results</h1>
        <h4 className="text-center">
          {values?.results.length < 1
            ? "No results found"
            : `Found : ${values.results.length}`}
        </h4>
        <div className="grid grid-cols-3 ">
          {values?.results.map((p) => (
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
    </Layout>
  );
}
