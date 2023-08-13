import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Home from "./Components/Home";
import Signout from './Components/Signout/Signout';
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import PostDetails from "./Components/PostDetails";
import Pay from "./Components/pay";
import Profile from "./Components/Profile";
import MyPosts from "./Components/MyPosts";
import AuthorProfile from "./Components/AuthorProfile";
import PostSimilarAuthor from "./Components/PostSimilarAuthor";
import Topiclist from "./Components/TopicList";


const App = () => {
  const [authorization, setAuthorization] = useState(localStorage.Authorization || "");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar authorization={authorization} setAuthorization={setAuthorization} />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        { path: '/', element: <Home authorization={authorization} setAuthorization={setAuthorization} /> },
        { path: '/login', element: <Signin authorization={authorization} setAuthorization={setAuthorization} /> },
        { path: '/register', element: <Signup authorization={authorization} setAuthorization={setAuthorization} /> },
        { path: '/logout', element: <Signout authorization={authorization} setAuthorization={setAuthorization} /> },
        {path:'/post/:id',element:<PostDetails  authorization={authorization} setAuthorization={setAuthorization}  />},
        {path:'/Pay',element:<Pay authorization={authorization} setAuthorization={setAuthorization} />},
        {path:'/myProfile',element:<Profile   authorization={authorization} setAuthorization={setAuthorization}  />},
       {path:'/mypost',element:<MyPosts  authorization={authorization} setAuthorization={setAuthorization}  />},
       {path:'/authorProfile/:username', element:<AuthorProfile  authorization={authorization} setAuthorization={setAuthorization} />},
        {path:'/postsSimilar/:author', element:<PostSimilarAuthor authorization={authorization} setAuthorization={setAuthorization}/>},
        {path:'/TopicList', element:<Topiclist authorization={authorization} setAuthorization={setAuthorization}/>},
       
      ],
    },
  ]);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
