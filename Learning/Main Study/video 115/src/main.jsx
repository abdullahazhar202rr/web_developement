import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import About from './components/About.jsx'


const router=createBrowserRouter([
  {
    path:"/",
    element:<About/>
  },
  {
    path:"/home",
    element:<App/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
