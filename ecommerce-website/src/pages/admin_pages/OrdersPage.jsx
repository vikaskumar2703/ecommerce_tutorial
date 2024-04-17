import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";

export default function OrdersPage() {
  return (
    <Layout title="Create Products">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <AdminMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            Orders
          </h1>
        </div>
      </div>
    </Layout>
  );
}
