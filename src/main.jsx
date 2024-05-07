import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Customerlist from './Components/Customerlist.jsx'
import Traininglist from './Components/Traininglist.jsx'
import Calender from './Components/Calender.jsx'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom';




const router = createBrowserRouter([
  {
  path: "/",
  element: <App />,
  children:[
  
  
    {
      path: "Traininglist",
    element: <Traininglist />,
    },  {
      path: "Customerlist",
      element: <Customerlist />,
    },
    {
      path: "Calender",
      element: <Calender />,
    },
  


  ]
  
  }
  
  ])
  




  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
  );
  
