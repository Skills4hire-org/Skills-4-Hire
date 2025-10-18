import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import Landing from "./pages/Landing";
import CustomerLayout from "./components/layouts/CustomerLayout";
import CustomerPosts from "./pages/CustomerPosts";
import CustomerOffers from "./pages/CustomerOffers";
import CustomerHomeLayout from "./components/layouts/CustomerHomeLayout";
import Services from "./pages/Services";
import AvailableServices from "./pages/AvailableServices";
import ServicesAroundYou from "./pages/ServicesAroundYou";
import ServicesLayout from "./components/layouts/ServicesLayout";
import CustomerBookings from "./pages/CustomerBookings";
import ServicesSearch from "./pages/ServicesSearch";
import WalletLayout from "./components/layouts/WalletLayout";
import Wallet from "./pages/Wallet";
import Rewards from "./pages/Rewards";
import Support from "./pages/Support";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Notification from "./pages/Notification";
import FAQs from "./pages/Faq";
import Referral from "./pages/Referral";
import ApprovePayment from "./pages/ApprovePayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verification",
    element: <Verification />,
  },
  {
    path: "customer",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <CustomerHomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="posts" />,
          },
          {
            path: "posts",
            element: <CustomerPosts />,
          },
          {
            path: "my-offers",
            element: <CustomerOffers />,
          },
        ],
      },
      {
        path: "services",
        element: <ServicesLayout />,
        children: [
          { index: true, element: <Services /> },
          {
            path: "available-services",
            element: <AvailableServices />,
          },
          {
            path: "available-services/:service",
            element: <AvailableServices />,
          },
          {
            path: "services-around-you",
            element: <ServicesAroundYou />,
          },
          {
            path: "search",
            element: <ServicesSearch />,
          },
          {
            path: "referral",
            element: <Referral />,
          },
        ],
      },
      {
        path: "bookings",
        element: <CustomerBookings />,
      },
      {
        path: "wallet",
        element: <WalletLayout />,
        children: [
          { index: true, element: <Wallet /> },
          { path: "approved", element: <ApprovePayment /> },
        ],
      },
      {
        path: "chats",
        element: <CustomerPosts />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "rewards",
        element: <Rewards />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "referral",
        element: <Referral />,
      },
    ],
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "faq",
    element: <FAQs />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
