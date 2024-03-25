import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import { Protected , Login } from './Componets/index.js'
import Signup from './Pages/Signup.jsx'
import Allposts from './Pages/Allpost.jsx'
import Addpost from './Pages/Addpost.jsx'
import EditPosts from './Pages/EditPosts.jsx'
import Post from './Pages/Post.jsx'
import ErrorElement from './Pages/ErrElement.jsx'
import Userdetails from './Pages/Userdetails.jsx'
import {ChakraProvider} from '@chakra-ui/react'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement : <ErrorElement/>,
    children: [
      {
        path: '/',
        element : <Home/>,
      },
      {
        path : "/login",
        element : (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
          path: "/signup",
          element: (
              <Protected authentication={false}>
                  <Signup />
              </Protected>
          ),
      },
      {
          path: "/all-posts",
          element: (
              <Protected authentication>
                  <Allposts />
              </Protected>
          ),
      },
      {
          path: "/add-post",
          element: (
              <Protected authentication>
                  <Addpost />
              </Protected>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <Protected authentication>
                  <EditPosts />
              </Protected>
          ),
      },
      {
        path: "/userdetails",
        element: (
            <Protected authentication>
                <Userdetails />
            </Protected>
        ),
      },
      {
          path: "/post/:slug",
          element: <Post/>,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
