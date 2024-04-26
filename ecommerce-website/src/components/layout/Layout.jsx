import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Layout(props) {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <div className="Hero min-h-screen flex justify-center ">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
