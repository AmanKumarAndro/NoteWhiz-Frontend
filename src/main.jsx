import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "aos/dist/aos.css";
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import About from './components/About.jsx';
import Layout from './Layout.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the main wrapper
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pricing",
        element: <Pricing />
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "signup",
        element: <Signup />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
