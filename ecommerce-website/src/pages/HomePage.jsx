import Layout from "../components/layout/Layout";
import { useState } from "react";
import useAuth from "../contexts/authContext";

export default function HomePage() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title="Ecommerce Site">
      <pre className="text-xs">{JSON.stringify(auth, null, 1)}</pre>
    </Layout>
  );
}
