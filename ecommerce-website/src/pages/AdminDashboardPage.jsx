import { AdminMenu } from "../components/layout/AdminMenu";
import Layout from "../components/layout/Layout";
import useAuth from "../contexts/authContext";

export default function AdminDashboardPage() {
  const [auth] = useAuth();
  return (
    <Layout title="Admin Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <AdminMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            Admin Details
          </h1>
          <div className="border-2 max-w-fit px-10 py-5 space-y-4 text-start">
            <h2 className="text-2xl">Admin Name : {auth?.user?.name}</h2>
            <h2 className="text-2xl">Admin Email : {auth?.user?.email}</h2>
            <h2 className="text-2xl">Admin Phone : {auth?.user?.phone}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
