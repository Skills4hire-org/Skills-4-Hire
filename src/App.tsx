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
import CustomerHome from "./pages/CustomerHome";
import CustomerPosts from "./pages/CustomerPosts";
import CustomerOffers from "./pages/CustomerOffers";

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
        element: <Navigate to="home/posts" />,
      },
      {
        path: "home",
        element: <CustomerHome />, 
        children: [
          {
            index: true,
            element: <Navigate to="posts" />,
          },
          {
            path: "posts",
            element: <CustomerPosts />, // tab 1
          },
          {
            path: "my-offers",
            element: <CustomerOffers />, // tab 2
          },
        ],
      },
      {
        path: "services",
        element: <CustomerHome />,
      },
      {
        path: "booking",
        element: <CustomerHome />,
      },
      {
        path: "wallet",
        element: <CustomerHome />,
      },
      {
        path: "chats",
        element: <CustomerHome />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
