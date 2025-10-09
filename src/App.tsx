import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import Verification from './pages/Verification'
import Landing from './pages/Landing'
import CustomerLayout from './components/layouts/CustomerLayout'
import CustomerPosts from './pages/CustomerPosts'
import CustomerOffers from './pages/CustomerOffers'
import CustomerHomeLayout from './components/layouts/CustomerHomeLayout'
import Services from './pages/Services'
import AvailableServices from './pages/AvailableServices'
import ServicesAroundYou from './pages/ServicesAroundYou'
import ServicesLayout from './components/layouts/ServicesLayout'
import CustomerBookings from './pages/CustomerBookings'
import ServicesSearch from './pages/ServicesSearch'
import WalletLayout from './components/layouts/WalletLayout'
import Wallet from './pages/Wallet'
import FavoritesLayout from './components/layouts/FavoritesLayout'
import FavoriteService from './pages/FavoriteService'
import FavoriteProvider from './pages/FavoriteProvider'
import Rewards from './pages/Rewards'
import Support from './pages/Support'
import AboutPage from './pages/AboutPage'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'verification',
    element: <Verification />,
  },
  {
    path: 'customer',
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <CustomerHomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="posts" />,
          },
          {
            path: 'posts',
            element: <CustomerPosts />,
          },
          {
            path: 'my-offers',
            element: <CustomerOffers />,
          },
        ],
      },
      {
        path: 'services',
        element: <ServicesLayout />,
        children: [
          { index: true, element: <Services /> },
          {
            path: 'available-services',
            element: <AvailableServices />,
          },
          {
            path: 'services-around-you',
            element: <ServicesAroundYou />,
          },
          {
            path: 'search',
            element: <ServicesSearch />,
          },
          {
            path: 'referral',
            element: <Verification />,
          },
        ],
      },
      {
        path: 'bookings',
        element: <CustomerBookings />,
      },
      {
        path: 'wallet',
        element: <WalletLayout />,
        children: [{ index: true, element: <Wallet /> }],
      },
      {
        path: 'chats',
        element: <CustomerPosts />,
      },
      {
        path: 'favorites',
        element: <FavoritesLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="favorite-service" />,
          },
          {
            path: 'favorite-service',
            element: <FavoriteService />,
          },
          {
            path: 'favorite-provider',
            element: <FavoriteProvider />,
          },
        ],
      },
      {
        path: 'rewards',
        element: <Rewards />,
      },
      {
        path: 'support',
        element: <Support />,
      },
      {
        path: 'notification',
        element: <Verification />,
      },
      /* {
        path: 'profile',
        element: <Verification />,
      }, */
    ],
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'terms-and-conditions',
    element: <TermsPage />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicyPage/>,
  },
  {
    path: 'faq',
    element: <Verification />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
