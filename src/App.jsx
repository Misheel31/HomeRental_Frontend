import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./private/components/About";
// import { AuthProvider } from "./Context/AuthContext";
import AdminManageProperty from "./private/Admin/AdminManageProperty";
import AdminPage from "./private/Admin/AdminPage";
import BookingList from "./private/Admin/BookingList";
import CreateProperty from "./private/Admin/CreateProperty";
import AdminPropertyDetails from "./private/Admin/PropertyDetail";
import UserList from "./private/Admin/UserList";
import ForgotPassword from "./private/Auth/UserForgotPassword";
import ResetPassword from "./private/Auth/UserResetPassword";
import { BookingPage } from "./private/pages/BookingPage";
import GetBooking from "./private/pages/getBooking";
import HomePage from "./private/pages/Dashboard";
import ProfilePage from "./private/pages/ProfilePage";
import PropertyDetails from "./private/pages/PropertyDetail";
import WishlistPage from "./private/pages/WishlistPage";
import LoginPage from "./public/LoginPage";
import RegisterPage from "./public/RegisterPage";
import SplashPage from "./public/SplashPage";

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
