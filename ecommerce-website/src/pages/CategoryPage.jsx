import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const categories = useCategory();

  return (
    <Layout title="Categories">
      {categories.map((c) => (
        <div key={c._id} className="m-4">
          <Link to={`${c.slug}`}>
            <div className="p-10  bg-blue-400 h-fit">{c.name}</div>
          </Link>
        </div>
      ))}
    </Layout>
  );
}
