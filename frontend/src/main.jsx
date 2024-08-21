import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

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
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='p-5'>
      <div className='flex align-center'>
        <h2 className='text-2xl font-extrabold tracking-tight text-zinc-800'>Heart-A-Track <i className='fa fa-heart fa-sm text-red-500'></i></h2>
      </div>
      <RouterProvider router={router} />
      <footer className='text-zinc-400'>Copyright © Yang-Yi Shen 2024</footer>
    </div>
  </StrictMode>,
)
