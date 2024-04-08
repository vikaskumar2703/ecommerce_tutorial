import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/authContext";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<PrivateRoutes />}>
              <Route path="" element={<DashboardPage />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route component={<ErrorPage />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
