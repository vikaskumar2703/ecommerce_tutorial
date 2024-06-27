import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/authContext";
import UserDashboardPage from "./pages/UserDashboardPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminRoutes from "./routes/AdminRoutes";
import CreateCategoryPage from "./pages/admin_pages/CreateCategoryPage";
import CreateProductsPage from "./pages/admin_pages/CreateProductPage";
import ProductsPage from "./pages/admin_pages/ProductsPage";
import OrdersPage from "./pages/admin_pages/OrdersPage";
import UserProfilePage from "./pages/user_pages/UserProfilePage";
import UserOrdersPage from "./pages/user_pages/UserOrdersPage";
import UpdateProductsPage from "./pages/admin_pages/UpdateProductsPage";
import SearchPage from "./pages/SearchPage";
import { SearchContextProvider } from "./contexts/searchContext";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartContextProvider } from "./contexts/cartContext";
import CategoryPage from "./pages/CategoryPage";
import CategoryProductPage from "./pages/CategoryProductPage";

function App() {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <CartContextProvider>
          <Router>
            <div>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/category" element={<CategoryPage />}></Route>
                <Route
                  path="/category/:slug"
                  element={<CategoryProductPage />}
                />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:slug" element={<ProductDetailsPage />} />
                <Route path="/dashboard" element={<PrivateRoutes />}>
                  <Route path="user" element={<UserDashboardPage />} />
                  <Route path="user/profile" element={<UserProfilePage />} />
                  <Route path="user/orders" element={<UserOrdersPage />} />
                </Route>
                <Route path="/dashboard" element={<AdminRoutes />}>
                  <Route path="admin" element={<AdminDashboardPage />} />
                  <Route
                    path="admin/create-category"
                    element={<CreateCategoryPage />}
                  />
                  <Route
                    path="admin/create-products"
                    element={<CreateProductsPage />}
                  />
                  <Route path="admin/products" element={<ProductsPage />} />
                  <Route
                    path="admin/products/:slug"
                    element={<UpdateProductsPage />}
                  />
                  <Route path="admin/orders" element={<OrdersPage />} />
                </Route>

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route component={<ErrorPage />} />
              </Routes>
              <ToastContainer position="top-center" autoClose={500} />
            </div>
          </Router>
        </CartContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
