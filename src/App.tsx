import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/Signup'
import SignIn from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import Verification from './pages/Verification'

const router = createBrowserRouter([
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
])

export default function App() {
  return <RouterProvider router={router} />
}
