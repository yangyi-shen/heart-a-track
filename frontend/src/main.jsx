import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'

import './main.css'

import Layout from './components/Layout.jsx'

import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

// routing
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login />},
      { path: 'register', element: <Register />}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
