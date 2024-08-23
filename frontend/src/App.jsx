import { useState } from 'react'

import userContext from './context/userContext.js'

import Layout from './components/Layout.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import RequireLogin from './components/RequireLogin.jsx'
import PastData from './pages/PastData.jsx'
import Record from './pages/Record.jsx'

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
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { 
        element: <RequireLogin />, 
        children: [
          { path: 'pastdata', element: <PastData /> },
          { path: 'record', element: <Record /> },
        ]
      }
    ]
  }
]);

export default function App() {
    const [userData, setUserData] = useState({
        signedIn: false
    })

    return (
        <userContext.Provider value={{ userData, setUserData }}>
            <RouterProvider router={router} />
        </userContext.Provider>
    )
}