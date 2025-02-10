import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
// import { AuthProvider } from "./Context/AuthContext";
import AdminManageProperty from "./Admin/AdminManageProperty";
import AdminPage from "./Admin/AdminPage";
import BookingList from "./Admin/BookingList";
import CreateProperty from "./Admin/CreateProperty";
import AdminPropertyDetails from "./Admin/PropertyDetail";
import UserList from "./Admin/UserList";
import LoginPage from "./Auth/LoginPage";
import RegisterPage from "./Auth/RegisterPage";
import ForgotPassword from "./Auth/UserForgotPassword";
import ResetPassword from "./Auth/UserResetPassword";
import { BookingPage } from "./pages/BookingPage";
import GetBooking from "./pages/getBooking";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PropertyDetails from "./pages/PropertyDetail";
import SplashPage from "./pages/SplashPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<SplashPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />
        <Route path="/booking/:propertyId" element={<BookingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/bookings" element={<GetBooking />} />
        <Route path="/bookingList" element={<BookingList />} />
        <Route
          path="/AdminManageProperty/:id"
          element={<AdminManageProperty />}
        />
        <Route path="/createProperty" element={<CreateProperty />} />
        <Route path="/users" element={<UserList />} />
        <Route
          path="/AdminManagePropertyDetails/:propertyId"
          element={<AdminPropertyDetails />}
        />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
