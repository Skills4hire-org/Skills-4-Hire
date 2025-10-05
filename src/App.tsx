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
import WalletLayout from "./components/layouts/WalletLayout";

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
            path: "services-around-you",
            element: <ServicesAroundYou />,
          },
        ],
      },
      {
        path: "bookings",
        element: <CustomerPosts />,
      },
      {
        path: "wallet",
        element: <WalletLayout />,
        children: [],
      },
      {
        path: "chats",
        element: <CustomerPosts />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
