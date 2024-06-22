import { UserMenu } from "../components/layout/UserMenu";
import Layout from "../components/layout/Layout";
import useAuth from "../contexts/authContext";

export default function UserDashboardPage() {
  const [auth] = useAuth();
  return (
    <Layout title="User Dashboard">
      <div className="grid grid-cols-4 grid-rows-1 w-full min-h-screen">
        <div className="text-center border">
          <UserMenu />
        </div>
        <div className="col-span-3 text-center p-5 flex flex-col items-center">
          <h1 className="text-4xl m-10 font-bold rounded-md underline">
            User Profile
          </h1>
          <div className="border text-left p-4 space-y-2 text-xl">
            <p>Name : {auth.user.name}</p>
            <p>Email : {auth.user.email} </p>
            <p>Phone : {auth.user.phone}</p>
            <p>Address : {auth.user.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
