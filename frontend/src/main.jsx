import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Login from './components/Login.jsx'

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h2>Heart-A-Track ❤️</h2>
    <RouterProvider router={router} />
    <footer>Copyright © Yang-Yi Shen 2024</footer>
  </StrictMode>,
)
