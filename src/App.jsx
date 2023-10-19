import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Login, Register, Dashboard, ProtectedRoute} from './pages'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext } from './context';
import {action as loginAction} from './pages/Login'
import {action as registerAction} from './pages/Register'

const App = () => {
  const {loginUser, registerUser} = useGlobalContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      action: loginAction(loginUser)
    },
    {
      path: '/register',
      element: <Register />,
      action: registerAction(registerUser)
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
  ])

  return (
    <>
      <ToastContainer position='top-center'/>
      <RouterProvider router={router} />
    </>
  )
}

export default App