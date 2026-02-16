import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import About from './pages/About'
import ApplicationProfile from './pages/ApplicationProfile'
import ApprovePayment from './pages/ApprovePayment'
import AvailableServices from './pages/AvailableServices'
import Bookings from './pages/Bookings'
import HomeLayout from './components/layouts/HomeLayout'
import CustomerOffers from './pages/CustomerOffers'
import Profile from './pages/Profile'
import Experience from './pages/Experience'
import FAQs from './pages/Faq'
import Favorites from './pages/Favorites'
import ForgotPassword from './pages/ForgotPassword'
import JobOffers from './pages/JobOffers'
import Landing from './pages/Landing'
import PersonalInfo from './pages/PersonalInfo'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ProviderOverview from './pages/ProviderOverview'
import Referral from './pages/Referral'
import Registration from './pages/Registration'
import Rewards from './pages/Rewards'
import ServiceProviderBooking from './pages/ServiceProviderBooking'
import ServiceProviderProfile from './pages/ServiceProviderProfile'
import Services from './pages/Services'
import ServicesAroundYou from './pages/ServicesAroundYou'
import ServicesSearch from './pages/ServicesSearch'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import SingleService from './pages/SingleService'
import Support from './pages/Support'
import TermsAndConditions from './pages/TermsAndConditions'
import Verification from './pages/Verification'
import Wallet from './pages/Wallet'
import WalletSend from './components/wallet/WalletSend'
import Withdraw from './components/wallet/Withdraw'
import Notification from './pages/Notification'
import Layout from './components/layouts/Layout'
import Posts from './pages/Posts'
import Request from './pages/Request'
import Reviews from './pages/Reviews'
import ServiceProviderServices from './pages/ServiceProviderServices'
import ServiceProviderActivity from './pages/ServiceProviderActivity'
import ServiceProviderImageGallery from './pages/ServiceProviderImageGallery'
import IndexLayout from './components/layouts/IndexLayout'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Legal from './pages/Legal'
import About2 from './pages/About2'
import CreateOffer from './pages/CreateOffer'
import UpdateOffer from './pages/UpdateOffer'
import CreatePost from './pages/CreatePost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:id',
        element: <BlogPost />,
      },
      {
        path: 'legal',
        element: <Legal />,
      },
      {
        path: 'about',
        element: <About2 />,
      },
    ],
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
    path: ':userType',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="posts" />,
          },
          {
            path: 'posts',
            element: <Posts />,
          },
          {
            path: 'my-offers',
            element: <CustomerOffers />,
          },
          {
            path: 'job-offers',
            element: <JobOffers />,
          },
        ],
      },
      {
        path: 'create-offer',
        element: <CreateOffer />,
      },
      {
        path: 'create-post',
        element: <CreatePost />,
      },
      {
        path: 'edit-offer/:id',
        element: <UpdateOffer />,
      },
      {
        path: 'overview',
        element: <ProviderOverview />,
      },
      { path: 'overview/request', element: <Request /> },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'services/available-services',
        element: <AvailableServices />,
      },
      {
        path: 'services/available-services/:service',
        element: <SingleService />,
      },
      {
        path: 'services/services-around-you',
        element: <ServicesAroundYou />,
      },
      {
        path: 'services/search',
        element: <ServicesSearch />,
      },
      {
        path: 'service-provider/:id',
        element: <ServiceProviderProfile />,
      },
      {
        path: 'service-provider/:id/services',
        element: <ServiceProviderServices />,
      },
      {
        path: 'service-provider/:id/activity',
        element: <ServiceProviderActivity />,
      },
      {
        path: 'service-provider/:id/gallery',
        element: <ServiceProviderImageGallery />,
      },
      {
        path: 'service-provider/:id/booking',
        element: <ServiceProviderBooking />,
      },
      {
        path: 'bookings',
        element: <Bookings />,
      },
      {
        path: 'wallet',
        element: <Wallet />,
      },
      { path: 'wallet/approve', element: <ApprovePayment /> },
      { path: 'wallet/withdraw', element: <Withdraw /> },
      { path: 'wallet/send', element: <WalletSend /> },
      {
        path: 'chats',
        element: <Posts />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
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
        element: <Notification />,
      },
      {
        path: 'referral',
        element: <Referral />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
      {
        path: 'registration/personal-information',
        element: <PersonalInfo />,
      },
      {
        path: 'registration/experience',
        element: <Experience />,
      },
      {
        path: 'registration/application-profile',
        element: <ApplicationProfile />,
      },
      {
        path: 'reviews',
        element: <Reviews />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: 'terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: 'faq',
    element: <FAQs />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
