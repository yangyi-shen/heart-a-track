import { useState } from 'react'

import userContext from './context/userContext.js'

import Layout from './components/Layout.jsx'

import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Record from './components/Record.jsx'

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
      { path: 'record', element: <Record /> }
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