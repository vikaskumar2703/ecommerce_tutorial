import { UserMenu } from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import useAuth from "../../contexts/authContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function UserProfilePage() {
  const [auth] = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const { email, name, address, phone } = auth?.user;
    setEmail(email), setName(name), setAddress(address), setPhone(phone);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/update`,
        {
          name,
          email,
          pass,
          phone,
          address,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="User Profile">
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
