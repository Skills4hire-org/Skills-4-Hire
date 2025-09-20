import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import VerificationPage from "./pages/VerificationPage";
import ProvidersHome from "./pages/ProvidersHome";
import CustomerHome from "./pages/CustomerHome";
import NotificationPage from "./pages/NotificationPage";
import ProvidersOverview from "./pages/ProvidersOverview";
import SearchScreen from "./pages/SearchScreen";
import SearchAroundYou from "./pages/SearchAroundYou";
import ProfileScreen from "./pages/ProfileScreen";

export default function App() {
  const handleVerificationConfirm = (code: string) => {
    console.log("User entered verification code:", code);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/verification"
        element={<VerificationPage onConfirm={handleVerificationConfirm} />}
      />

      <Route path="/providers-home/*" element={<ProvidersHome />} />
      <Route path="/providers-overview" element={<ProvidersOverview />} />

      <Route path="/customers-home/*" element={<CustomerHome />} />

      <Route path="/notifications" element={<NotificationPage />} />

      <Route path="/search" element={<SearchScreen />} />
      <Route path="/search-around-you" element={<SearchAroundYou />} />

      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
}
