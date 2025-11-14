import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import About from "./pages/About";
import ApplicationProfile from "./pages/ApplicationProfile";
import ApprovePayment from "./pages/ApprovePayment";
import AvailableServices from "./pages/AvailableServices";
import CustomerBookings from "./pages/CustomerBookings";
import CustomerHomeLayout from "./components/layouts/CustomerHomeLayout";
import CustomerLayout from "./components/layouts/CustomerLayout";
import CustomerOffers from "./pages/CustomerOffers";
import CustomerPosts from "./pages/CustomerPosts";
import CustomerProfile from "./pages/CustomerProfile";
import Experience from "./pages/Experience";
import FAQs from "./pages/Faq";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import JobOffers from "./pages/JobOffers";
import Landing from "./pages/Landing";
import PersonalInfo from "./pages/PersonalInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProviderOverview from "./pages/ProviderOverview";
import Referral from "./pages/Referral";
import Registration from "./pages/Registration";
import Rewards from "./pages/Rewards";
import ServiceProviderBooking from "./pages/ServiceProviderBooking";
import ServiceProviderProfile from "./pages/ServiceProviderProfile";
import Services from "./pages/Services";
import ServicesAroundYou from "./pages/ServicesAroundYou";
import ServicesLayout from "./components/layouts/ServicesLayout";
import ServicesSearch from "./pages/ServicesSearch";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import SingleService from "./pages/SingleService";
import Support from "./pages/Support";
import TermsAndConditions from "./pages/TermsAndConditions";
import Verification from "./pages/Verification";
import Wallet from "./pages/Wallet";
import WalletLayout from "./components/layouts/WalletLayout";
import WalletSend from "./components/wallet/WalletSend";
import Withdraw from "./components/wallet/Withdraw";
import Notification from "./pages/Notification";

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
    path: ":userRole",
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
          {
            path: "job-offers",
            element: <JobOffers />,
          },
        ],
      },

      {
        path: "overview",
        element: <ProviderOverview />,
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
            element: <SingleService />,
          },
          {
            path: "services-around-you",
            element: <ServicesAroundYou />,
          },
          {
            path: "search",
            element: <ServicesSearch />,
          },
        ],
      },
      {
        path: "service-provider/:id",
        element: <ServiceProviderProfile />,
      },
      {
        path: "service-provider/:id/booking",
        element: <ServiceProviderBooking />,
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
          { path: "approve", element: <ApprovePayment /> },
          { path: "withdraw", element: <Withdraw /> },
          { path: "send", element: <WalletSend /> },
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
      {
        path: "profile",
        element: <CustomerProfile />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "registration/personal-information",
        element: <PersonalInfo />,
      },
      {
        path: "registration/experience",
        element: <Experience />,
      },
      {
        path: "registration/application-profile",
        element: <ApplicationProfile />,
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
