import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App_main from './App_main.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Signin from './pages/Signin.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path:'/signin',
    element:<Signin/>
  },
  {
    path:'/dashboard',
    element:<App_main/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
