import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AuthForm from './components/logReg';
import NavigationMenu from './components/navbar';
import About from './components/about';
import ContributionPage from './components/viewnotes';
import Mynotes from './components/my-notes';
 
const container = document.getElementById('root');
const root = createRoot(container);

const routes = [
  {
    path: '/',
    element:<NavigationMenu />,
    children: [
      { 
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/notes/:currentId',
        element: <ContributionPage />,
      },
      {
        path: '/my-notes',
        element: <Mynotes />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '/authentication',
    element: <AuthForm />
  }
];

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);